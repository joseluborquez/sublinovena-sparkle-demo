import { useEffect, useState } from "react";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { ClientLogos } from "@/components/site/ClientLogos";
import { Catalog } from "@/components/site/Catalog";
import { HowTo, steps as howToSteps } from "@/components/site/HowTo";
import { FAQ, faqs } from "@/components/site/FAQ";
import { TrabajosRealizados } from "@/components/site/TrabajosRealizados";
import {
  GoogleReviews,
  reviews,
  googleRating,
  googleReviewCount,
} from "@/components/site/GoogleReviews";
import { Footer } from "@/components/site/Footer";
import { WhatsappFab } from "@/components/site/WhatsappFab";
import { siteConfig } from "@/lib/site-config";

const title = "Sublinovena | Merchandising corporativo personalizado en Temuco";
const description =
  "Fábrica de merchandising corporativo en Temuco, Chile: lanyards, tazones, botellas, vestuario, chapitas y más de 100 productos, personalizados con tu logo desde pocas unidades.";

const reviewsJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#organization`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: googleRating,
    reviewCount: googleReviewCount,
  },
  review: reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
    reviewBody: r.text,
  })),
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo cotizar y comprar merchandising corporativo en Sublinovena",
  step: howToSteps.map((s) => ({
    "@type": "HowToStep",
    name: s.title,
    text: s.description,
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

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
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(reviewsJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(howToJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
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
    <>
      <Navbar />
      <main style={ready ? undefined : { visibility: "hidden" }}>
        <Hero />
        <ClientLogos />
        <TrabajosRealizados />
        <GoogleReviews />
        <HowTo />
        <Catalog />
        <FAQ />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
