"use client";

import { useEffect } from "react";

const MESSAGE_TYPE = "anvetcorp:section-selected";

/**
 * Bridge de click-a-Section para Editor Anvetcorp (DW-008, Bloque E4 --
 * DECISIÓN PO 2 y PO 3). Este componente NO sabe qué es un
 * `component` ni un `variant`, no tiene catálogo propio, no modifica
 * ninguna Section, no envuelve nada -- un único listener de click
 * global, montado una sola vez en `layout.js` (mismo patrón que
 * `CustomerSessionProvider`/`CartProvider`/`VehicleSelectionProvider`:
 * siempre en el árbol, se auto-desactiva sin romper nada si no
 * aplica).
 *
 * Se activa SOLO cuando:
 * - `window.self !== window.top` -- esta instancia está corriendo
 *   embebida dentro de un iframe. Fuera de eso, nunca hace nada, ni
 *   siquiera agrega el listener.
 * - `NEXT_PUBLIC_ANVETCORP_EDITOR_ORIGIN` está configurado -- el
 *   origin exacto del Editor Anvetcorp permitido para este deploy. Ver
 *   DECISIÓN PO 2: nunca se confía en ningún query parameter (ni en
 *   `document.referrer`, ni en nada que venga del propio iframe) como
 *   fuente de autoridad para esto -- tiene que ser configuración
 *   explícita de ESTA instancia.
 *
 * Al hacer click: busca el ancestro DOM más cercano con un `id` --
 * el contrato ya existente (`SectionRenderSerializer.id = content_id`,
 * ver `content_admin`/`api/serializers.py`) ya pone ese `id` en la
 * raíz de cada Section renderizada (`SectionRenderer.jsx`) -- y le
 * manda al padre `{ type: "anvetcorp:section-selected", contentId }`,
 * SIEMPRE con `targetOrigin` explícito (el origin configurado), NUNCA
 * `"*"`. La validación definitiva de si ese `content_id` corresponde a
 * una Section real de la Page actual la hace Editor Anvetcorp del otro
 * lado (`PreviewFrame`), no este bridge -- acá no hay ningún catálogo
 * contra el cual comparar, ni falta que haga.
 */
export function EditorBridge() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
    if (window.self === window.top) {
      // No está embebido en ningún iframe -- nada que hacer.
      return undefined;
    }

    const editorOrigin = process.env.NEXT_PUBLIC_ANVETCORP_EDITOR_ORIGIN;
    if (!editorOrigin) {
      // Sin origin del Editor configurado explícitamente para este
      // deploy, el bridge se queda completamente inactivo -- nunca usa
      // ningún origin por defecto ni "*".
      return undefined;
    }

    function handleClick(event) {
      const target =
        event.target instanceof Element ? event.target.closest("[id]") : null;
      if (!target) {
        return;
      }
      window.parent.postMessage(
        { type: MESSAGE_TYPE, contentId: target.id },
        editorOrigin
      );
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
