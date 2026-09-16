"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import styles from "./Slider.module.css";
import { sliderAspectClasses } from "./slider.tokens";

/**
 * Slider UI Base
 *
 * Componente reutilizable para carruseles de contenido.
 *
 * Soporta:
 * - imágenes
 * - captions
 * - navegación
 * - dots
 * - ratios configurables
 *
 * Ratios:
 * - auto
 * - square
 * - video
 * - portrait
 * - landscape
 *
 * Uso recomendado:
 * - galerías
 * - productos
 * - servicios
 * - testimonios
 * - sliders destacados
 *
 * Reglas:
 * - Mantener responsive.
 * - Utilizar aspect ratios oficiales.
 * - Mantener navegación accesible.
 * - Consumir variables globales.
 * - Evitar lógica de negocio dentro del componente.
 */

export function Slider({
  items = [],
  renderItem,
  initialIndex = 0,
  loop = true,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  interval = 5000,
  aspect = "video",
  className = "",
}) {
  const normalizedItems = useMemo(
    () => (Array.isArray(items) ? items.filter(Boolean) : []),
    [items],
  );

  const [storedIndex, setStoredIndex] = useState(
    Math.min(initialIndex, Math.max(normalizedItems.length - 1, 0)),
  );
  const maxIndex = Math.max(normalizedItems.length - 1, 0);
  const currentIndex = Math.min(storedIndex, maxIndex);

  const setCurrentIndex = useCallback((value) => {
    setStoredIndex((previousIndex) => {
      const boundedPreviousIndex = Math.min(previousIndex, maxIndex);
      const nextIndex =
        typeof value === "function" ? value(boundedPreviousIndex) : value;

      return Math.min(nextIndex, maxIndex);
    });
  }, [maxIndex]);

  useEffect(() => {
    if (!autoPlay || normalizedItems.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === normalizedItems.length - 1) {
          return loop ? 0 : prev;
        }

        return prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, loop, normalizedItems.length, setCurrentIndex]);

  function goTo(index) {
    setCurrentIndex(index);
  }

  function goToPrev() {
    if (normalizedItems.length <= 1) return;

    setCurrentIndex((prev) => {
      if (prev === 0) {
        return loop ? normalizedItems.length - 1 : 0;
      }

      return prev - 1;
    });
  }

  function goToNext() {
    if (normalizedItems.length <= 1) return;

    setCurrentIndex((prev) => {
      if (prev === normalizedItems.length - 1) {
        return loop ? 0 : prev;
      }

      return prev + 1;
    });
  }

  if (normalizedItems.length === 0) return null;

  const aspectKey = sliderAspectClasses[aspect] || sliderAspectClasses.video;
  const rootClassName = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div className={rootClassName}>
      <div className={`${styles.viewport} ${styles[aspectKey]}`}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {normalizedItems.map((item, index) => (
            <div className={styles.slide} key={item.id ?? index}>
              {renderItem ? renderItem(item, index) : <DefaultSlide item={item} />}
            </div>
          ))}
        </div>

        {showArrows && normalizedItems.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.prev}`}
              onClick={goToPrev}
              aria-label="Slide anterior"
            >
              ‹
            </button>

            <button
              type="button"
              className={`${styles.arrow} ${styles.next}`}
              onClick={goToNext}
              aria-label="Siguiente slide"
            >
              ›
            </button>
          </>
        )}
      </div>

      {showDots && normalizedItems.length > 1 && (
        <div
          className={styles.dots}
          role="tablist"
          aria-label="Navegación del slider"
        >
          {normalizedItems.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.dot} ${
                index === currentIndex ? styles.dotActive : ""
              }`}
              onClick={() => goTo(index)}
              aria-label={`Ir al slide ${index + 1}`}
              aria-pressed={index === currentIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DefaultSlide({ item }) {
  if (!item) return null;

  return (
    <div className={styles.defaultSlide}>
      {item.image && (
        <img src={item.image} alt={item.alt || ""} className={styles.image} />
      )}

      {(item.title || item.description) && (
        <div className={styles.caption}>
          {item.title && <h3 className={styles.captionTitle}>{item.title}</h3>}
          {item.description && (
            <p className={styles.captionText}>{item.description}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Slider;
