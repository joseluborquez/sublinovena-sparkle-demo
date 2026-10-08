import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Clock } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsappFab } from "@/components/site/WhatsappFab";
import { WhatsappIcon } from "@/components/site/WhatsappIcon";
import { BackButton } from "@/components/site/BackButton";
import { siteConfig, waLink } from "@/lib/site-config";

const title = `Contacto | ${siteConfig.name}`;
const description =
  "Cotiza merchandising corporativo con Sublinovena por WhatsApp o email. Dos direcciones en Temuco, despacho a todo Chile.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${siteConfig.url}/contact` },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.url}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 pb-16 pt-36 lg:px-8 lg:pb-24 lg:pt-40">
        <BackButton />

        <h1 className="display-title mt-6 text-3xl sm:text-5xl">Hablemos de tu pedido</h1>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          En {siteConfig.name} cotizamos directo por WhatsApp, sin formularios ni esperas: nos
          cuentas el producto y la cantidad que necesitas, y te respondemos con el precio real según
          el tramo que corresponda. También puedes escribirnos por email o visitarnos en cualquiera
          de nuestras dos direcciones en Temuco.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <a
            href={waLink("Hola, vengo de la página web y quiero cotizar")}
            target="_blank"
            rel="noreferrer"
            className="card-lift flex items-start gap-4 rounded-3xl border border-border bg-card p-6"
          >
            <WhatsappIcon className="mt-1 size-6 shrink-0 text-leaf" />
            <div>
              <p className="font-semibold text-foreground">WhatsApp</p>
              <p className="mt-1 text-sm text-muted-foreground">{siteConfig.phone}</p>
              <p className="mt-2 text-xs text-muted-foreground">La vía más rápida para cotizar.</p>
            </div>
          </a>

          <a
            href={`mailto:${siteConfig.email}`}
            className="card-lift flex items-start gap-4 rounded-3xl border border-border bg-card p-6"
          >
            <Mail className="mt-1 size-6 shrink-0 text-magenta" />
            <div>
              <p className="font-semibold text-foreground">Email</p>
              <p className="mt-1 text-sm text-muted-foreground">{siteConfig.email}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Para cotizaciones formales o pedidos grandes.
              </p>
            </div>
          </a>

          {siteConfig.addresses.map((a) => (
            <div
              key={a.street}
              className="card-lift flex items-start gap-4 rounded-3xl border border-border bg-card p-6"
            >
              <MapPin className="mt-1 size-6 shrink-0 text-magenta" />
              <div>
                <p className="font-semibold text-foreground">{a.street}</p>
                <p className="mt-1 text-sm text-muted-foreground">{a.city}, Chile</p>
              </div>
            </div>
          ))}

          <div className="card-lift flex items-start gap-4 rounded-3xl border border-border bg-card p-6">
            <Clock className="mt-1 size-6 shrink-0 text-cyan" />
            <div>
              <p className="font-semibold text-foreground">Despacho</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Fabricamos tu pedido y coordinamos la entrega en todo Chile.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
