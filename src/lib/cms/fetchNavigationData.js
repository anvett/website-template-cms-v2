import { cmsFetch } from "./client";

/**
 * Reemplazo, para instancias con CMS activo, de
 * `import { navigationData } from "@/data/global/navigation.data"`.
 * Shape: `{ announcement, navbar, footerNavigation }`.
 */
export async function fetchNavigationData(options) {
  return cmsFetch("/navigation/", options);
}
