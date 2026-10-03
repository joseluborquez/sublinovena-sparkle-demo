import { useEffect, useState } from "react";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { QuoteProvider } from "@/components/site/QuoteProvider";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { ClientLogos } from "@/components/site/ClientLogos";
import { Catalog } from "@/components/site/Catalog";
import { HowTo } from "@/components/site/HowTo";
import { TrabajosRealizados } from "@/components/site/TrabajosRealizados";
import { GoogleReviews } from "@/components/site/GoogleReviews";
import { Footer } from "@/components/site/Footer";
import { WhatsappFab } from "@/components/site/WhatsappFab";
import { siteConfig } from "@/lib/site-config";

const title = "Sublinovena | Merchandising corporativo personalizado en Temuco";
const description =
  "Fábrica de merchandising corporativo en Temuco, Chile: lanyards, tazones, botellas, vestuario, chapitas y más de 100 productos, personalizados con tu logo desde pocas unidades.";

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
    links: [{ rel: "canonical", href: siteConfig.url }],
  }),
  component: Index,
});

function Index() {
  const hash = useRouterState({ select: (s) => s.location.hash });
  const [ready, setReady] = useState(() => !hash);

  useEffect(() => {
    if (!hash) {
      setReady(true);
      return;
    }
    setReady(false);
    let cancelled = false;
    let attempts = 0;
    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        setReady(true);
        return;
      }
      if (++attempts > 90) {
        setReady(true);
        return;
      }
      requestAnimationFrame(tryScroll);
    };
    tryScroll();
    return () => {
      cancelled = true;
    };
  }, [hash]);

  return (
    <QuoteProvider>
      <Navbar />
      <main style={ready ? undefined : { visibility: "hidden" }}>
        <Hero />
        <ClientLogos />
        <TrabajosRealizados />
        <GoogleReviews />
        <HowTo />
        <Catalog />
      </main>
      <Footer />
      <WhatsappFab />
    </QuoteProvider>
  );
}
