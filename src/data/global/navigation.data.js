/**
 * navigation.data.js — PLACEHOLDER de base.
 *
 * Este archivo debe reescribirse por completo para cada instancia de
 * cliente (ver 05-MANUAL-CREACION-DE-INSTANCIAS-v2.md). Navbar vacío y
 * footer sin grupos para que el proyecto compile out-of-the-box sin
 * arrastrar datos de ningún cliente anterior.
 */
export const navigationData = {
  navbar: {
    enabled: true,
    variant: "default",
    content: {
      logo: {
        href: "/",
        label: "Template Base",
        image: null,
      },
    },
    items: [],
    actions: [],
  },

  footerNavigation: {
    enabled: true,
    groups: [],
  },
};

export default navigationData;
