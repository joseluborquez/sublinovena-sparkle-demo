import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsappFab } from "@/components/site/WhatsappFab";
import { BackButton } from "@/components/site/BackButton";
import { siteConfig } from "@/lib/site-config";

const title = `Política de privacidad | ${siteConfig.name}`;
const description =
  "Cómo Sublinovena trata los datos de contacto que recibe por WhatsApp y email al cotizar.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${siteConfig.url}/privacy` },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.url}/privacy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 pb-16 pt-36 lg:px-8 lg:pb-24 lg:pt-40">
        <BackButton />

        <h1 className="display-title mt-6 text-3xl sm:text-5xl">Política de privacidad</h1>
        <p className="mt-3 text-sm text-muted-foreground">Última actualización: octubre de 2026.</p>

        <p className="mt-6 leading-relaxed text-muted-foreground">
          Esta página explica, en términos simples, qué datos recibe {siteConfig.legalName} cuando
          contactas a {siteConfig.name} y cómo los usamos. Somos una fábrica de merchandising
          corporativo con base en Temuco, Chile, y este sitio es un catálogo informativo: no tiene
          cuentas de usuario, formularios que guarden tus datos en una base propia, ni cookies de
          seguimiento publicitario.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">Qué datos recibimos</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Cuando nos escribes por WhatsApp o email para cotizar, recibimos la información que tú
          decides compartir en ese mensaje: normalmente tu nombre, el nombre de tu empresa, un
          número de contacto y el detalle del producto o cantidad que te interesa. No pedimos datos
          sensibles ni financieros a través del sitio; cualquier pago se coordina por separado,
          directamente contigo.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">Cómo usamos esos datos</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Usamos tus datos de contacto únicamente para responder tu cotización, coordinar la
          producción y el despacho de tu pedido, y para comunicarnos contigo sobre pedidos
          anteriores si vuelves a escribirnos. No vendemos ni compartimos tu información con
          terceros para fines publicitarios.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">WhatsApp y email</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Las conversaciones que iniciás con nosotros por WhatsApp quedan sujetas además a la
          política de privacidad de WhatsApp/Meta, ya que es la plataforma donde se almacenan. Lo
          mismo aplica a los correos que nos envíes, que quedan en nuestro proveedor de email.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">Navegación del sitio</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Este sitio no usa cookies de seguimiento ni herramientas de analítica de terceros. El
          hosting (Vercel) puede registrar datos técnicos básicos de las solicitudes (como la
          dirección IP) por motivos de seguridad y funcionamiento del servicio, de forma estándar
          para cualquier sitio web.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">Contacto</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Si tienes preguntas sobre esta política o quieres que eliminemos datos de contacto que nos
          hayas enviado, escríbenos a{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-medium text-magenta hover:underline"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
