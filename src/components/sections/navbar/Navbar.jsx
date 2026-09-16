// "use client";

// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import { navigationData } from "@/data/global/navigation.data";
// import { Button } from "@/components/ui/actions/Button";

// export function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const navbar = navigationData.navbar;

//   if (!navbar?.enabled) return null;

//   const logo = navbar.content?.logo;
//   const action = navbar.actions?.[0];

//   return (
//     <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-bg-white)/95 backdrop-blur">
//       <div className="mx-auto flex h-[6rem] w-full max-w-[84rem] items-center justify-between gap-6 px-[1rem]">
//         <a href={logo?.href || "/"} className="flex items-center gap-3">
//           {logo?.image?.src && (
//             <img
//               src={logo.image.src}
//               alt={logo.image.alt || logo.label}
//               className="block max-h-[5.25rem] w-auto"
//             />
//           )}

//           <span className="sr-only">{logo?.label}</span>
//         </a>

//         <nav className="hidden items-center gap-7 lg:flex">
//           {navbar.items.map((item) => (
//             <a
//               key={item.id}
//               href={item.href}
//               className="text-[0.95rem] font-bold text-(--color-text) transition-colors hover:text-(--color-primary)"
//             >
//               {item.label}
//             </a>
//           ))}
//         </nav>

//         <div className="hidden lg:block">
//           {action && (
//             <Button href={action.href} variant={action.variant}>
//               {action.label}
//             </Button>
//           )}
//         </div>

//         <button
//           type="button"
//           className="inline-flex h-[2.75rem] w-[2.75rem] pr-4 items-center justify-center rounded-full border border-(--color-border) text-(--color-primary) lg:hidden"
//           onClick={() => setIsOpen((value) => !value)}
//           aria-label="Abrir menú"
//         >
//           {isOpen ? <X size="1.8rem" /> : <Menu size="1.8rem" />}
//         </button>
//       </div>

//       {isOpen && (
//         <div className="border-t border-(--color-border) bg-(--color-bg-soft) lg:hidden">
//           <nav className="section-container grid gap-4 py-5">
//             {navbar.items.map((item) => (
//               <a
//                 key={item.id}
//                 href={item.href}
//                 className="text-[1rem] font-bold text-(--color-text)"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.label}
//               </a>
//             ))}

//             {action && (
//               <div className="pt-2">
//                 <Button href={action.href} variant={action.variant}>
//                   {action.label}
//                 </Button>
//               </div>
//             )}
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Navbar;

"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, ShoppingCart, User, X } from "lucide-react";
import { navigationData as staticNavigationData } from "@/data/global/navigation.data";
import { Button } from "@/components/ui/actions/Button";
import { useCart } from "@/lib/storefront/CartContext";
import { isStorefrontEnabled } from "@/lib/storefront/env";

const ADVANCED_VARIANT = "logo-left-menu-right-dropdown-transparent";

export function Navbar({ navigation } = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const navbar = (navigation ?? staticNavigationData).navbar;
  // Ícono de carrito en el Navbar (pedido explícito del dueño del
  // proyecto, 2026-09-04) -- abre el mismo panel que el botón flotante
  // (`CartWidget`), vía el estado compartido de `CartContext`
  // (`isOpen`/`openCart`, ver ese archivo). `CartProvider` envuelve todo
  // el árbol siempre (layout.js), así que `useCart()` acá nunca explota
  // aunque el storefront esté deshabilitado -- solo el ÍCONO se gatea por
  // `storefrontEnabled` más abajo, mismo criterio que el link "Mi
  // cuenta". Llamado ACÁ, antes del `return null` de más abajo -- un Hook
  // nunca puede ejecutarse condicionalmente (regla de React).
  const { count: cartCount, openCart } = useCart();

  useEffect(() => {
    if (navbar?.variant !== ADVANCED_VARIANT) return;

    function handleScroll() {
      setHasScrolled(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navbar?.variant]);

  if (!navbar?.enabled) return null;

  const logo = navbar.content?.logo;
  const action = navbar.actions?.[0];
  const isAdvanced = navbar.variant === ADVANCED_VARIANT;
  // "Mi cuenta" (Fase 5.5, login/registro/Mis pedidos) -- a diferencia
  // del resto de este componente (100% CMS-driven vía `navigationData`),
  // este link es una feature del storefront, no contenido editorial, así
  // que se agrega acá directo (mismo criterio que `CartWidget`/
  // `FloatingWhatsapp`: gateado por `isStorefrontEnabled()`, invisible en
  // cualquier instancia sin storefront configurado).
  const storefrontEnabled = isStorefrontEnabled();

  const headerClassName = isAdvanced
    ? [
        "sticky top-0 z-50 transition-colors duration-200",
        hasScrolled || isOpen
          ? "border-b border-(--color-border) bg-(--color-bg-white)/95 backdrop-blur"
          : "border-b border-transparent bg-transparent",
      ].join(" ")
    : "sticky top-0 z-50 border-b border-(--color-border) bg-(--color-bg-white)/95 backdrop-blur";

  const linkClassName =
    isAdvanced && !hasScrolled && !isOpen
      ? "text-[0.95rem] font-bold text-white transition-colors hover:text-(--color-accent)"
      : "text-[0.95rem] font-bold text-(--color-text) transition-colors hover:text-(--color-primary)";

  const iconButtonClassName =
    isAdvanced && !hasScrolled && !isOpen
      ? "inline-flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-full border border-white/40 text-accent lg:hidden"
      : "inline-flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-full border border-(--color-border) text-(--color-primary) lg:hidden";

  return (
    <header className={headerClassName}>
      <div className="mx-auto flex h-[6rem] w-full max-w-[84rem] items-center justify-between gap-6 px-[1rem]">
        <a href={logo?.href || "/"} className="flex items-center gap-3">
          {logo?.image?.src && (
            <img
              src={logo.image.src}
              alt={logo.image.alt || logo.label}
              className="block max-h-[5.25rem] w-auto"
            />
          )}

          <span className="sr-only">{logo?.label}</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navbar.items.map((item) => {
            const hasChildren =
              isAdvanced &&
              item.type === "dropdown" &&
              Array.isArray(item.children) &&
              item.children.length > 0;

            if (!hasChildren) {
              return (
                <a key={item.id} href={item.href} className={linkClassName}>
                  {item.label}
                </a>
              );
            }

            return (
              <div key={item.id} className="group relative">
                <a href={item.href} className={`${linkClassName} flex items-center gap-1`}>
                  {item.label}
                  <ChevronDown size="1rem" />
                </a>

                <div className="invisible absolute left-0 top-full z-50 min-w-[16rem] translate-y-3 rounded-[var(--radius-lg)] border border-(--color-border) bg-(--color-bg-white) p-3 opacity-0 shadow-[var(--shadow-lg)] transition-all duration-200 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
                  <div className="grid gap-1">
                    {item.children.map((child) => (
                      <a
                        key={child.id}
                        href={child.href}
                        className="rounded-[var(--radius-md)] px-3 py-2 text-[0.95rem] font-semibold text-(--color-text) transition-colors hover:bg-(--color-bg-soft) hover:text-(--color-primary)"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {storefrontEnabled && (
            <button
              type="button"
              onClick={openCart}
              aria-label="Abrir carrito"
              className={`relative inline-flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border transition-colors ${
                isAdvanced && !hasScrolled && !isOpen
                  ? "border-white/40 text-white hover:border-white hover:text-(--color-accent)"
                  : "border-(--color-border) text-(--color-text) hover:border-(--color-primary) hover:text-(--color-primary)"
              }`}
            >
              <ShoppingCart size="1.2rem" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[1.1rem] min-w-[1.1rem] items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[0.65rem] font-bold text-[var(--color-primary)]">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {storefrontEnabled && (
            <a
              href="/cuenta"
              aria-label="Mi cuenta"
              className={`inline-flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border transition-colors ${
                isAdvanced && !hasScrolled && !isOpen
                  ? "border-white/40 text-white hover:border-white hover:text-(--color-accent)"
                  : "border-(--color-border) text-(--color-text) hover:border-(--color-primary) hover:text-(--color-primary)"
              }`}
            >
              <User size="1.2rem" />
            </a>
          )}

          {action && (
            <Button href={action.href} variant={action.variant}>
              {action.label}
            </Button>
          )}
        </div>

        <button
          type="button"
          className={iconButtonClassName}
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Abrir menú"
        >
          {isOpen ? <X size="1.4rem" /> : <Menu size="1.4rem" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-(--color-border) bg-(--color-bg-white) lg:hidden">
          <nav className="section-container grid gap-3 py-5">
            {navbar.items.map((item) => {
              const hasChildren =
                isAdvanced &&
                item.type === "dropdown" &&
                Array.isArray(item.children) &&
                item.children.length > 0;

              if (!hasChildren) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className="text-[1rem] font-bold text-(--color-text)"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              }

              const isGroupOpen = openMobileGroup === item.id;

              return (
                <div key={item.id} className="grid gap-2">
                  <button
                    type="button"
                    className="flex items-center justify-between text-left text-[1rem] font-bold text-(--color-text)"
                    onClick={() =>
                      setOpenMobileGroup(isGroupOpen ? null : item.id)
                    }
                  >
                    {item.label}
                    <ChevronDown
                      size="1rem"
                      className={isGroupOpen ? "rotate-180 transition-transform" : "transition-transform"}
                    />
                  </button>

                  {isGroupOpen && (
                    <div className="grid gap-2 border-l border-(--color-border) pl-4">
                      {item.children.map((child) => (
                        <a
                          key={child.id}
                          href={child.href}
                          className="text-[0.95rem] font-semibold text-(--color-text-soft)"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {storefrontEnabled && (
              <button
                type="button"
                className="flex items-center gap-2 text-left text-[1rem] font-bold text-(--color-text)"
                onClick={() => {
                  setIsOpen(false);
                  openCart();
                }}
              >
                <ShoppingCart size="1.1rem" />
                Carrito
                {cartCount > 0 && (
                  <span className="flex h-[1.35rem] min-w-[1.35rem] items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[0.75rem] font-bold text-[var(--color-primary)]">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {storefrontEnabled && (
              <a
                href="/cuenta"
                className="flex items-center gap-2 text-[1rem] font-bold text-(--color-text)"
                onClick={() => setIsOpen(false)}
              >
                <User size="1.1rem" />
                Mi cuenta
              </a>
            )}

            {action && (
              <div className="pt-2">
                <Button href={action.href} variant={action.variant}>
                  {action.label}
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;