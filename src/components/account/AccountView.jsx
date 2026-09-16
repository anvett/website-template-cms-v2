"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/actions/Button";
import { useCustomerSession } from "@/lib/storefront/CustomerSessionContext";
import { fetchMyOrders } from "@/lib/storefront/client";

/**
 * Página de cuenta de cliente (Fase 5.5, roadmap sección 6: "Mis
 * pedidos... casi gratis dado que los pedidos ya van a quedar
 * registrados en el backend"). Client Component completo -- a
 * diferencia del resto del sitio, no hay ninguna Page/Section del CMS
 * detrás (mismo criterio que la ruta de vehículo, Fase 5.4): esto es
 * pura UI de sesión de cliente, no contenido editorial.
 *
 * Reusa `useCustomerSession()` (Fase 0/1, ya wireado en `layout.js`) en
 * vez de manejar su propio estado de sesión -- login/logout acá afectan
 * el mismo `CartWidget` que ya lee esa sesión en cualquier otra página.
 */
export function AccountView() {
  const { enabled, status, customer, token, login, register, logout } =
    useCustomerSession();

  if (!enabled) {
    return (
      <EmptyState message="La cuenta de cliente no está disponible en este sitio." />
    );
  }

  if (status === "loading") {
    return <EmptyState message="Cargando..." />;
  }

  if (status === "authenticated") {
    return (
      <AuthenticatedAccount customer={customer} token={token} onLogout={logout} />
    );
  }

  return <AnonymousAccount login={login} register={register} />;
}

function EmptyState({ message }) {
  return (
    <div className="section-container section-container--content flex min-h-[40vh] items-center justify-center py-16">
      <p className="text-[0.95rem] text-[var(--color-text-soft)]">{message}</p>
    </div>
  );
}

function AuthenticatedAccount({ customer, token, onLogout }) {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetchMyOrders(token)
      .then((data) => {
        if (!cancelled) setOrders(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!cancelled) {
          setOrders([]);
          setError(err?.message || "No se pudo cargar tu historial de pedidos.");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="section-container section-container--content flex flex-col gap-10 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-[var(--color-text)]">
          Hola, {customer?.name}
        </h1>
        <p className="text-[0.9rem] text-[var(--color-text-soft)]">
          {customer?.email}
          {customer?.business_name ? ` — ${customer.business_name}` : ""}
        </p>
        <Button variant="outline" onClick={onLogout} className="mt-2 w-fit">
          Cerrar sesión
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-[1.25rem] font-bold text-[var(--color-primary)]">
          Mis pedidos
        </h2>

        {orders === null && (
          <p className="text-[0.9rem] text-[var(--color-text-soft)]">
            Cargando tu historial...
          </p>
        )}

        {error && (
          <p className="text-[0.9rem] text-[var(--color-danger)]">{error}</p>
        )}

        {orders?.length === 0 && !error && (
          <p className="text-[0.9rem] text-[var(--color-text-soft)]">
            Todavía no enviaste ningún pedido.
          </p>
        )}

        {orders?.length > 0 && (
          <ul className="flex flex-col gap-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-[var(--color-text)]">
                    Pedido #{order.id}
                  </span>
                  <span className="text-[0.8rem] text-[var(--color-text-soft)]">
                    {new Date(order.created_at).toLocaleDateString("es-EC", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <ul className="mt-3 flex flex-col gap-1 text-[0.85rem] text-[var(--color-text-soft)]">
                  {(order.items || []).map((item, index) => (
                    <li key={index}>
                      {item.quantity} x {item.title}
                      {item.price ? ` — ${item.price} c/u` : ""}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function AnonymousAccount({ login, register }) {
  const [mode, setMode] = useState("login");

  return (
    <div className="section-container section-container--content flex flex-col gap-8 py-16">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-[var(--color-text)]">
          Mi cuenta
        </h1>
        <p className="text-[0.9rem] text-[var(--color-text-soft)]">
          Iniciá sesión para ver precios y tu historial de pedidos.
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-[var(--radius-md)] px-4 py-2 text-[0.9rem] font-bold transition ${
              mode === "login"
                ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                : "border border-[var(--color-border)] text-[var(--color-text-soft)]"
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 rounded-[var(--radius-md)] px-4 py-2 text-[0.9rem] font-bold transition ${
              mode === "register"
                ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                : "border border-[var(--color-border)] text-[var(--color-text-soft)]"
            }`}
          >
            Solicitar cuenta
          </button>
        </div>

        {mode === "login" ? (
          <LoginForm login={login} />
        ) : (
          <RegisterForm register={register} />
        )}
      </div>
    </div>
  );
}

function LoginForm({ login }) {
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
    } catch (err) {
      setError(err?.message || "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <FormField label="Email" type="email" value={email} onChange={setEmail} required />
      <FormField
        label="Contraseña"
        type="password"
        value={password}
        onChange={setPassword}
        required
      />
      {error && <p className="text-[0.8rem] text-[var(--color-danger)]">{error}</p>}
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
}

function RegisterForm({ register }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business_name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const setField = (key) => (value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(form);
      setDone(true);
    } catch (err) {
      setError(err?.message || "No se pudo enviar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <p className="rounded-[var(--radius-lg)] bg-[var(--color-bg-soft)] p-4 text-[0.9rem] text-[var(--color-text)]">
        Solicitud recibida. Tu cuenta queda pendiente de aprobación por el
        vendedor -- te avisamos por WhatsApp o email cuando esté lista.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <FormField label="Nombre" value={form.name} onChange={setField("name")} required />
      <FormField
        label="Email"
        type="email"
        value={form.email}
        onChange={setField("email")}
        required
      />
      <FormField label="Teléfono" value={form.phone} onChange={setField("phone")} />
      <FormField
        label="Nombre del taller/negocio (opcional)"
        value={form.business_name}
        onChange={setField("business_name")}
      />
      <FormField
        label="Contraseña"
        type="password"
        value={form.password}
        onChange={setField("password")}
        required
      />
      {error && <p className="text-[0.8rem] text-[var(--color-danger)]">{error}</p>}
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Enviando..." : "Solicitar cuenta"}
      </Button>
    </form>
  );
}

function FormField({ label, type = "text", value, onChange, required = false }) {
  return (
    <label className="flex flex-col gap-1 text-[0.85rem] text-[var(--color-text-soft)]">
      {label}
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2 text-[0.9rem] text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
      />
    </label>
  );
}

export default AccountView;
