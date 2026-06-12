"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";
import { modalSizes } from "./modal.tokens";

/**
 * Modal UI Base
 *
 * Componente reutilizable para contenido emergente.
 *
 * Soporta:
 * - overlay
 * - cierre por Escape
 * - cierre por overlay
 * - portal a document.body
 * - tamaños configurables
 *
 * Sizes:
 * - sm
 * - md
 * - lg
 *
 * Props principales:
 * - isOpen
 * - onClose
 * - title
 * - description
 * - size
 * - closeOnOverlay
 * - children
 *
 * Uso recomendado:
 * - productos
 * - servicios
 * - galerías
 * - testimonios
 * - formularios
 * - detalles ampliados
 * - CMS futuro
 *
 * Reglas:
 * - No almacenar estado interno de negocio.
 * - Mantener control desde la section padre.
 * - Mantener accesibilidad mediante aria.
 * - Usar createPortal para evitar conflictos de layout.
 */

export function Modal({
  isOpen = false,
  onClose,
  title,
  description,
  size = "md",
  closeOnOverlay = true,
  children,
}) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClass = modalSizes[size] || modalSizes.md;

  return createPortal(
    <div
      className={styles.overlay}
      onClick={closeOnOverlay ? onClose : undefined}
      role="presentation"
    >
      <div
        className={`${styles.panel} ${styles[sizeClass]}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Modal"}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ×
        </button>

        {(title || description) && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <p className={styles.description}>{description}</p>}
          </div>
        )}

        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;