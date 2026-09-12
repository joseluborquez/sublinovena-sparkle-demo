import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CheckCircle2, X } from "lucide-react";

type QuoteCtx = { open: (product?: string) => void };
const Ctx = createContext<QuoteCtx>({ open: () => {} });

export const useQuote = () => useContext(Ctx);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<string | undefined>();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    setTimeout(() => setSent(false), 300);
  };

  return (
    <Ctx.Provider
      value={{
        open: (p) => {
          setProduct(p);
          setSent(false);
          setIsOpen(true);
        },
      }}
    >
      {children}

      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[80] flex items-end justify-center transition-opacity duration-300 sm:items-center ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          aria-label="Cerrar"
          onClick={close}
          className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Solicitar cotización"
          className={`relative flex h-full w-full flex-col overflow-y-auto bg-card p-7 shadow-2xl transition-all duration-300 sm:h-auto sm:max-w-lg sm:rounded-3xl ${
            isOpen ? "translate-y-0 scale-100" : "translate-y-6 scale-[0.98]"
          }`}
        >
          <div className="rule-brand absolute inset-x-0 top-0 sm:rounded-t-3xl" />
          <button
            onClick={close}
            aria-label="Cerrar formulario"
            className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
          >
            <X size={18} />
          </button>

          {sent ? (
            <div className="flex flex-1 animate-[fade-in_0.4s_ease-out] flex-col items-center justify-center gap-4 py-14 text-center">
              <div className="bg-brand-gradient grid size-20 place-items-center rounded-full">
                <CheckCircle2 size={38} className="text-ink" />
              </div>
              <h3 className="display-title text-2xl">¡Listo!</h3>
              <p className="max-w-xs text-sm text-muted-foreground">
                Te contactaremos a la brevedad con tu cotización personalizada.
              </p>
              <button onClick={close} className="btn-brand mt-2">
                Seguir explorando
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="mt-4 space-y-4"
            >
              <div>
                <p className="eyebrow">Cotización</p>
                <h3 className="display-title mt-2 text-2xl">Cuéntanos qué necesitas</h3>
                {product && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Producto: <span className="font-medium text-foreground">{product}</span>
                  </p>
                )}
              </div>

              <Field label="RUT empresa" placeholder="76.543.210-K" />
              <Field label="Nombre de contacto" placeholder="María Pérez" />
              <Field label="Email o WhatsApp" placeholder="maria@empresa.cl" />
              <Field label="Cantidad estimada" placeholder="1.000 unidades" type="number" />

              <button type="submit" className="btn-brand w-full">
                Enviar solicitud
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Demo de diseño: el formulario no envía datos reales.
              </p>
            </form>
          )}
        </div>
      </div>
    </Ctx.Provider>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
