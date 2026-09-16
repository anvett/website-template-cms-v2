"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  fetchCurrentCustomer,
  loginCustomer,
  logoutCustomer,
  registerCustomer,
} from "./client";
import { isStorefrontEnabled } from "./env";

const STORAGE_KEY = "storefront_customer_token";

const CustomerSessionContext = createContext(null);

/**
 * Sesión de cliente (comprador), Fase 0/1 — ver
 * docs/decisions/CATALOGO-AVANZADO-VEHICULAR-ROADMAP.md. Token en
 * `localStorage` (nunca cookie: mismo criterio ya usado por el resto del
 * proyecto de no depender de sesiones server-side para esta capa), se
 * valida contra `/storefront/me/` al montar para saber si sigue siendo
 * válido (pudo expirar o haber sido revocado desde el Admin).
 *
 * `status`:
 * - "loading": todavía no se resolvió si hay sesión válida.
 * - "anonymous": sin sesión (o storefront no configurado en esta
 *   instancia — ver `isStorefrontEnabled()`).
 * - "authenticated": sesión válida, `customer` disponible.
 *
 * El login del backend YA rechaza cuentas `pending`/`rejected` (ver
 * `CustomerLoginView`), así que si `status === "authenticated"` acá el
 * cliente está aprobado — `canSeePrices` es solo un alias explícito para
 * que el resto del código no tenga que saber esa regla de memoria.
 */
export function CustomerSessionProvider({ children }) {
  const enabled = isStorefrontEnabled();
  const [token, setToken] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [status, setStatus] = useState(enabled ? "loading" : "anonymous");

  useEffect(() => {
    if (!enabled) return;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Mismo caso que CartContext.jsx: sincronizar con `localStorage`
      // (sistema externo, no existe en el render de servidor) recién en
      // el efecto es la excepción legítima que la propia regla describe.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("anonymous");
      return;
    }

    setToken(stored);
    fetchCurrentCustomer(stored)
      .then((data) => {
        setCustomer(data);
        setStatus("authenticated");
      })
      .catch(() => {
        window.localStorage.removeItem(STORAGE_KEY);
        setToken(null);
        setStatus("anonymous");
      });
  }, [enabled]);

  const login = useCallback(async (email, password) => {
    const data = await loginCustomer({ email, password });
    window.localStorage.setItem(STORAGE_KEY, data.token);
    setToken(data.token);
    setCustomer(data.customer);
    setStatus("authenticated");
    return data.customer;
  }, []);

  const register = useCallback(async (payload) => {
    const data = await registerCustomer(payload);
    return data.customer;
  }, []);

  const logout = useCallback(async () => {
    const currentToken = token;
    window.localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setCustomer(null);
    setStatus("anonymous");
    if (currentToken) {
      try {
        await logoutCustomer(currentToken);
      } catch {
        // La sesión ya se limpió localmente -- si el backend no llega a
        // revocarla (red caída, etc.) igual expira sola a los 30 días
        // (CustomerSession._default_session_expiry).
      }
    }
  }, [token]);

  const value = useMemo(
    () => ({
      enabled,
      status,
      token,
      customer,
      isAuthenticated: status === "authenticated",
      canSeePrices: status === "authenticated",
      login,
      register,
      logout,
    }),
    [enabled, status, token, customer, login, register, logout]
  );

  return (
    <CustomerSessionContext.Provider value={value}>
      {children}
    </CustomerSessionContext.Provider>
  );
}

export function useCustomerSession() {
  const ctx = useContext(CustomerSessionContext);
  if (!ctx) {
    throw new Error(
      "useCustomerSession debe usarse dentro de <CustomerSessionProvider>"
    );
  }
  return ctx;
}
