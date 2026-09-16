import { AccountView } from "@/components/account/AccountView";

export const metadata = {
  title: "Mi cuenta — Eurocentro",
  description: "Iniciá sesión o solicitá una cuenta para ver precios y tu historial de pedidos.",
};

/**
 * `/cuenta` (Fase 5.5) -- login/registro/"Mis pedidos". Sin fetch de
 * datos server-side: toda la lógica de sesión ya vive en
 * `CustomerSessionProvider` (Fase 0/1, `layout.js`), esta Page solo le
 * da una URL propia y metadata básica. Ver `AccountView.jsx` para el
 * detalle.
 */
export default function CuentaPage() {
  return (
    <main>
      <AccountView />
    </main>
  );
}
