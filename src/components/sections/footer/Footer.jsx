// import { navigationData } from "@/data/global/navigation.data";
// import { siteData } from "@/data/global/site.data";

// export function Footer() {
//   const footer = navigationData.footerNavigation;

//   if (!footer?.enabled) return null;

//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="section-shell section-shell--compact surface-dark">
//       <div className="section-container">
//         <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
//           <div>
//             {navigationData.navbar?.content?.logo?.image?.src && (
//               <a
//                 href={navigationData.navbar.content.logo.href || "/"}
//                 className="mb-5 block w-fit"
//                 aria-label={
//                   navigationData.navbar.content.logo.label || siteData.site.name
//                 }
//               >
//                 <img
//                   src={navigationData.navbar.content.logo.image.src}
//                   alt={
//                     navigationData.navbar.content.logo.image.alt ||
//                     siteData.site.name
//                   }
//                   className="block w-[16rem] max-w-full md:w-[12rem] lg:w-[10rem]"
//                 />
//               </a>
//             )}

//             <h2 className="text-[1.75rem] font-bold leading-tight text-white">
//               {siteData.site.name}
//             </h2>

//             <p className="mt-4 max-w-[26rem] text-[1rem] leading-7 text-white/75">
//               {siteData.branding.siteDescription}
//             </p>

//             <p className="mt-5 text-[0.95rem] leading-6 text-white/65">
//               {siteData.address.fullAddress}
//             </p>
//           </div>

//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
//             {footer.groups.map((group) => (
//               <div key={group.id}>
//                 <h3 className="text-[1rem] font-bold text-white">
//                   {group.title}
//                 </h3>

//                 <ul className="mt-4 grid gap-3">
//                   {group.links.map((link) => (
//                     <li key={link.id}>
//                       <a
//                         href={link.href}
//                         className="text-[0.95rem] leading-6 text-white/70 transition-colors hover:text-[var(--color-accent)]"
//                       >
//                         {link.label}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mt-10 border-t border-white pt-6 text-center">
//           <p className="text-[0.9rem] leading-6 text-white/60">
//             © {currentYear} Anvetcorp SAS. Todos los derechos
//             reservados.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import { navigationData as staticNavigationData } from "@/data/global/navigation.data";
import { siteData as staticSiteData } from "@/data/global/site.data";

/**
 * `navigation`/`site` opcionales — mismo patrón y mismo motivo que en
 * `Navbar.jsx` (cronograma 3.4, convivencia Data estático / CMS).
 */
export function Footer({ navigation, site } = {}) {
  const navigationData = navigation ?? staticNavigationData;
  const siteData = site ?? staticSiteData;
  const footer = navigationData.footerNavigation;

  if (!footer?.enabled) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="surface-dark py-[var(--section-spacing-compact)]">
      <div className="mx-auto w-full max-w-[var(--container-width-wide)] px-[var(--container-padding)]">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            {navigationData.navbar?.content?.logo?.image?.src && (
              <a
                href={navigationData.navbar.content.logo.href || "/"}
                className="mb-5 block w-fit"
                aria-label={
                  navigationData.navbar.content.logo.label || siteData.site.name
                }
              >
                <img
                  src={navigationData.navbar.content.logo.image.src}
                  alt={
                    navigationData.navbar.content.logo.image.alt ||
                    siteData.site.name
                  }
                  className="block w-[16rem] max-w-full md:w-[12rem] lg:w-[10rem]"
                />
              </a>
            )}

            <h2 className="text-[1.75rem] font-bold leading-tight text-white">
              {siteData.site.name}
            </h2>

            <p className="mt-4 max-w-[26rem] text-[1rem] leading-7 text-white/75">
              {siteData.branding.siteDescription}
            </p>

            <p className="mt-5 text-[0.95rem] leading-6 text-white/65">
              {siteData.address.fullAddress}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footer.groups.map((group) => (
              <div key={group.id}>
                <h3 className="text-[1rem] font-bold text-white">
                  {group.title}
                </h3>

                <ul className="mt-4 grid gap-3">
                  {group.links.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        className="text-[0.95rem] leading-6 text-white/70 transition-colors hover:text-[var(--color-accent)]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/12 pt-6 text-center">
          <p className="text-[0.9rem] leading-6 text-white/60">
            © {currentYear} {siteData.site.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;