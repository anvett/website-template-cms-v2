"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "storefront_cart_items";

const CartContext = createContext(null);

function readStoredItems() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Carrito de compras (Fase 1, ver
 * docs/decisions/CATALOGO-AVANZADO-VEHICULAR-ROADMAP.md sección 7).
 *
 * Vive en `localStorage` -- funciona para visitantes anónimos (no exige
 * sesión de cliente, decisión 2026-09-02: "el cliente anónimo si puede
 * cotizar por whatsapp con el carrito pero no puede ver precios"). No
 * hay backend de "carrito en progreso": el `Order` (backend/storefront/
 * models.py) recién se crea al enviar, este contexto es solo estado
 * local del navegador hasta ese momento.
 *
 * Los items se identifican por `title` (mismo criterio que el
 * catálogo viejo, que no tiene un id numérico estable todavía -- eso
 * llega con el `Product` real en la Fase 3). Si dos productos de
 * categorías distintas llegaran a compartir título exacto podrían
 * fusionarse en el carrito; no ocurre hoy en el catálogo de Eurocentro
 * (verificado) y se resuelve solo cuando el carrito pase a usar
 * `Product.id` real.
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  // Estado del panel (abierto/cerrado) vive acá, no como `useState` local
  // de `CartWidget` -- desde que el ícono del Navbar (2026-09-04) también
  // necesita poder abrirlo, dos entry points distintos (el botón
  // flotante y el ícono del Navbar) tienen que controlar el mismo panel;
  // un solo estado compartido es más simple que sincronizar dos.
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Lee `localStorage` (no existe en el render de servidor) recién acá,
    // a propósito -- si se leyera en el initializer de useState() el HTML
    // de servidor y el primer render de cliente quedarían desalineados
    // (hydration mismatch). Sincronizar con este "sistema externo" en un
    // efecto es exactamente el caso que la regla react-hooks/
    // set-state-in-effect deja como excepción legítima (ver su propio
    // mensaje: "Subscribe for updates from some external system").
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(readStoredItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((product, quantity = 1) => {
    if (!product?.title) return;
    setItems((current) => {
      const existingIndex = current.findIndex(
        (entry) => entry.title === product.title
      );
      if (existingIndex >= 0) {
        const next = [...current];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [
        ...current,
        {
          title: product.title,
          image: product.image || "",
          price: product.price || "",
          quantity,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((title) => {
    setItems((current) => current.filter((entry) => entry.title !== title));
  }, []);

  const setQuantity = useCallback((title, quantity) => {
    setItems((current) => {
      if (quantity <= 0) {
        return current.filter((entry) => entry.title !== title);
      }
      return current.map((entry) =>
        entry.title === title ? { ...entry, quantity } : entry
      );
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((current) => !current), []);

  const count = useMemo(
    () => items.reduce((total, entry) => total + entry.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      setQuantity,
      clear,
      count,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      items,
      addItem,
      removeItem,
      setQuantity,
      clear,
      count,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return ctx;
}
