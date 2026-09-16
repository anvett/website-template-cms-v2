"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/actions/Button";
import { Modal } from "@/components/ui/feedback/Modal";
import { siteData as staticSiteData } from "@/data/global/site.data";
import { useCart } from "@/lib/storefront/CartContext";
import { useCustomerSession } from "@/lib/storefront/CustomerSessionContext";
import { submitOrder } from "@/lib/storefront/client";
import { isStorefrontEnabled } from "@/lib/storefront/env";

function buildWhatsappMessage(items, canSeePrices) {
  const lines = items.map((item) => {
    const pricePart = canSeePrices && item.price ? ` — ${item.price} c/u` : "";
    return `• ${item.quantity} x ${item.title}${pricePart}`;
  });
  return ["Hola, quiero cotizar/pedir estos repuestos:", "", ...lines].join(
    "\n"
  );
}

/**
 * Carrito flotante con checkout por WhatsApp (Fase 1, ver
 * docs/decisions/CATALOGO-AVANZADO-VEHICULAR-ROADMAP.md sección 7).
 *
 * Mismo patrón visual que `FloatingWhatsapp` (posición fija, entrada con
 * framer-motion), apilado en la MISMA esquina (`right-6`), arriba del
 * botón de WhatsApp (`bottom-28` vs `bottom-6` de este último -- pedido
 * explícito del dueño del proyecto 2026-09-04; antes vivía en la esquina
 * opuesta, `bottom-6 left-6`). El panel reutiliza el `Modal` UI Base
 * (CLAUDE.md, "Reglas de Reutilización") en vez de un overlay armado a
 * mano.
 *
 * El estado abierto/cerrado del panel vive en `CartContext`
 * (`isOpen`/`openCart`/`closeCart`), no como `useState` local de este
 * componente -- desde que el ícono del Navbar también puede abrir el
 * carrito, ambos entry points comparten el mismo estado.
 *
 * Precio/total SOLO visibles si hay sesión de cliente aprobada
 * (`useCustomerSession().canSeePrices`) -- un visitante anónimo puede
 * agregar productos, ajustar cantidades y enviar el pedido por WhatsApp
 * igual, pero nunca ve precio en este panel (decisión 2026-09-02).
 *
 * Nota de alcance: el catálogo actual (`Section.items`, pre-Fase 3) sigue
 * mostrando precio en las tarjetas de producto a cualquier visitante --
 * el ocultamiento real de precio (Fase 0) todavía no cubre esa capa
 * vieja, ver docstring de `Order` en `backend/storefront/models.py`. Este
 * panel ya aplica la regla donde puede (acá adentro); el resto llega en
 * la Fase 3/4 cuando el catálogo pase al `Product` real.
 */
export function CartWidget({ site }) {
  const { isOpen, openCart, closeCart } = useCart();

  if (!isStorefrontEnabled()) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 64 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        className="fixed bottom-28 right-6 z-40"
      >
        <CartTrigger onOpen={openCart} />
      </motion.div>

      <CartPanel site={site} isOpen={isOpen} onClose={closeCart} />
    </>
  );
}

function CartTrigger({ onOpen }) {
  const { count } = useCart();

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Abrir carrito"
      className="relative flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-primary)] text-[var(--color-text-inverse)] shadow-[var(--shadow-lg)] transition duration-300 ease-in-out hover:scale-105"
    >
      <ShoppingCart className="h-[1.6rem] w-[1.6rem]" aria-hidden="true" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-[1.35rem] min-w-[1.35rem] items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[0.7rem] font-bold text-[var(--color-primary)]">
          {count}
        </span>
      )}
    </button>
  );
}

function CartPanel({ site, isOpen, onClose }) {
  const { items, removeItem, setQuantity, clear } = useCart();
  const { enabled, status, canSeePrices, login } = useCustomerSession();
  const [sending, setSending] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const siteData = site ?? staticSiteData;
  const phone = siteData?.contact?.whatsapp;

  const handleSend = async () => {
    if (items.length === 0) return;
    setSending(true);

    try {
      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem("storefront_customer_token")
          : null;
      await submitOrder(items, token || undefined);
    } catch {
      // El pedido puede haber fallado en registrarse en el backend -- no
      // bloquea el envío por WhatsApp igual (mismo criterio del proyecto,
      // decision-log.md 2026-08-07: WhatsApp es el canal real, el
      // registro/email son respaldo).
    }

    if (phone) {
      const message = buildWhatsappMessage(items, canSeePrices);
      window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer"
      );
    }

    setSending(false);
    clear();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tu carrito" size="sm">
      {items.length === 0 ? (
        <p className="py-6 text-center text-[0.9rem] text-[var(--color-text-soft)]">
          Todavía no agregaste productos.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.title} className="flex items-center gap-3">
              {item.image && (
                <img
                  src={item.image}
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-bg-soft)] object-contain p-1"
                />
              )}
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-[0.9rem] font-bold text-[var(--color-text)]">
                  {item.title}
                </span>
                {canSeePrices && item.price && (
                  <span className="text-[0.8rem] text-[var(--color-text-soft)]">
                    {item.price}
                  </span>
                )}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(item.title, item.quantity - 1)}
                    aria-label="Restar"
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-soft)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  >
                    <Minus className="h-3 w-3" aria-hidden="true" />
                  </button>
                  <span className="w-5 text-center text-[0.85rem]">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(item.title, item.quantity + 1)}
                    aria-label="Sumar"
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-soft)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  >
                    <Plus className="h-3 w-3" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.title)}
                aria-label="Quitar del carrito"
                className="text-[var(--color-text-soft)] transition hover:text-[var(--color-danger)]"
              >
                <Trash2 className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {enabled && status !== "authenticated" && items.length > 0 && (
        <div className="mt-5 rounded-[var(--radius-lg)] bg-[var(--color-bg-soft)] p-4">
          {showLogin ? (
            <LoginInlineForm onSuccess={() => setShowLogin(false)} login={login} />
          ) : (
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="text-[0.85rem] font-bold text-[var(--color-primary)] underline underline-offset-2"
            >
              ¿Ya tenés cuenta? Iniciá sesión para ver precios
            </button>
          )}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 border-t border-[var(--color-border)] pt-5">
        <Button
          variant="primary"
          onClick={handleSend}
          disabled={items.length === 0 || sending || !phone}
        >
          {sending ? "Enviando..." : "Enviar pedido por WhatsApp"}
        </Button>
      </div>
    </Modal>
  );
}

function LoginInlineForm({ onSuccess, login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      onSuccess();
    } catch (err) {
      setError(err?.message || "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2 text-[0.85rem] outline-none focus:border-[var(--color-primary)]"
      />
      <input
        type="password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Contraseña"
        className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2 text-[0.85rem] outline-none focus:border-[var(--color-primary)]"
      />
      {error && (
        <p className="text-[0.75rem] text-[var(--color-danger)]">{error}</p>
      )}
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
}

export default CartWidget;
