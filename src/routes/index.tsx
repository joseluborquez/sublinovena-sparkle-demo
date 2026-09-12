import { createFileRoute } from "@tanstack/react-router";
import { QuoteProvider } from "@/components/site/QuoteProvider";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Catalog } from "@/components/site/Catalog";
import { HowTo } from "@/components/site/HowTo";
import { LogoPreview } from "@/components/site/LogoPreview";
import { ValueProps } from "@/components/site/ValueProps";
import { Footer } from "@/components/site/Footer";
import { WhatsappFab } from "@/components/site/WhatsappFab";

const title = "Sublinovena | Merchandising corporativo personalizado";
const description =
  "Merchandising corporativo personalizado en Chile: tazas, poleras, mochilas, botellas y accesorios tech desde 1.000 unidades con tu logo.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <QuoteProvider>
      <Navbar />
      <main>
        <Hero />
        <Catalog />
        <HowTo />
        <LogoPreview />
        <ValueProps />
      </main>
      <Footer />
      <WhatsappFab />
    </QuoteProvider>
  );
}
