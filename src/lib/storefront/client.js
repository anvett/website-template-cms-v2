/**
 * Fetch helper CLIENT-SIDE para los endpoints de storefront (Fase 0/1),
 * montados en el backend bajo `/api/v1/sites/{site_slug}/storefront/...`
 * (ver `backend/api/urls.py`). Deliberadamente separado de
 * `src/lib/cms/client.js` (server-only, usa el secreto `CMS_API_TOKEN`
 * vía Server Components) — este módulo corre en el navegador, sin
 * ningún secreto de por medio: register/login/logout/me/orders son
 * públicos o usan el token de SESIÓN DE CLIENTE (`CustomerSession.key`),
 * nunca el token de lectura del Site.
 */

import { getPublicApiUrl, getPublicSiteSlug } from "./env";

export class StorefrontApiError extends Error {
  constructor(message, { status = 0, data = null } = {}) {
    super(message);
    this.name = "StorefrontApiError";
    this.status = status;
    this.data = data;
  }
}

async function storefrontFetch(path, { method = "GET", body, token } = {}) {
  const apiUrl = getPublicApiUrl();
  const siteSlug = getPublicSiteSlug();

  if (!apiUrl || !siteSlug) {
    throw new StorefrontApiError(
      "El carrito/cuentas de cliente no están disponibles en este sitio."
    );
  }

  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(
      `${apiUrl}/api/v1/sites/${siteSlug}/storefront/${path}`,
      {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
      }
    );
  } catch {
    throw new StorefrontApiError(
      "No se pudo conectar con el servidor. Probá de nuevo en un momento."
    );
  }

  let data = null;
  const text = await response.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message =
      data?.detail || "Ocurrió un error. Intentá de nuevo en un momento.";
    throw new StorefrontApiError(message, { status: response.status, data });
  }

  return data;
}

export function registerCustomer(payload) {
  return storefrontFetch("register/", { method: "POST", body: payload });
}

export function loginCustomer(payload) {
  return storefrontFetch("login/", { method: "POST", body: payload });
}

export function logoutCustomer(token) {
  return storefrontFetch("logout/", { method: "POST", token });
}

export function fetchCurrentCustomer(token) {
  return storefrontFetch("me/", { token });
}

export function submitOrder(items, token) {
  return storefrontFetch("orders/", {
    method: "POST",
    body: { items },
    token: token || undefined,
  });
}

// Fase 5.5 -- "Mis pedidos" (roadmap sección 6). A diferencia de
// `submitOrder` (público, `token` opcional), esta SÍ exige sesión --
// sin token no hay "mis pedidos" que pedir, así que no tiene sentido
// llamarla sin uno (el backend igual la rechaza con 401 si se hiciera).
export function fetchMyOrders(token) {
  return storefrontFetch("orders/mine/", { token });
}
