import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin } from "lucide-react";
import chileCompraLogo from "@/assets/chilecompra-logo.png";
import { siteConfig, waLink } from "@/lib/site-config";
import { WhatsappIcon } from "./WhatsappIcon";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer id="contacto" className="relative bg-ink text-white">
      <div className="rule-brand" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <Reveal className="lg:col-span-2">
          <div className="text-center lg:text-left">
            <p className="font-brand text-xs font-bold uppercase tracking-[0.3em] text-cyan">
              Somos proveedores del Estado
            </p>
            <div className="mt-4 inline-flex items-center rounded-xl bg-white px-6 py-5">
              <img src={chileCompraLogo} alt="ChileCompra" loading="lazy" className="h-12 w-auto" />
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
            Fabricamos merchandising corporativo personalizado para empresas en todo Chile: acabados
            de calidad y acompañamiento real, desde el primer contacto con nuestro equipo, hasta la
            entrega.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h3 className="font-brand text-xs font-bold uppercase tracking-[0.3em] text-cyan">
            Navegación
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            <li>
              <Link to="/catalogo" className="transition-colors hover:text-cyan">
                Catálogo
              </Link>
            </li>
            <li>
              <Link to="/" hash="como-cotizar" className="transition-colors hover:text-cyan">
                Cómo cotizar
              </Link>
            </li>
            <li>
              <Link
                to="/"
                hash="preguntas-frecuentes"
                className="transition-colors hover:text-cyan"
              >
                Preguntas frecuentes
              </Link>
            </li>
            <li>
              <Link to="/blog" className="transition-colors hover:text-cyan">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-cyan">
                Quiénes somos
              </Link>
            </li>
            <li>
              <Link to="/" hash="top" className="transition-colors hover:text-cyan">
                Inicio
              </Link>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={200}>
          <h3 className="font-brand text-xs font-bold uppercase tracking-[0.3em] text-cyan">
            Contacto
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            <li className="flex items-center gap-2">
              <Mail size={15} className="shrink-0 text-cyan" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-cyan">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <WhatsappIcon className="size-4 shrink-0 text-leaf" />
              <a
                href={waLink("Hola, vengo de la página web y quiero cotizar")}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan"
              >
                +56 9 5654 2568
              </a>
            </li>
            {siteConfig.addresses.map((a) => (
              <li key={a.street} className="flex items-center gap-2">
                <MapPin size={15} className="shrink-0 text-magenta" /> {a.street}, {a.city}
              </li>
            ))}
            <li>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition-colors hover:border-cyan hover:text-cyan"
              >
                <Instagram size={15} /> @sublinovena
              </a>
            </li>
            <li>
              <Link to="/contact" className="hover:text-cyan">
                Página de contacto
              </Link>
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 border-t border-white/10 px-5 py-6 text-center text-xs text-white/40 lg:flex-row lg:justify-between lg:px-8">
        <span>
          © {new Date().getFullYear()} {siteConfig.legalName} · Temuco, Chile
        </span>
        <Link to="/privacy" className="hover:text-cyan">
          Política de privacidad
        </Link>
      </div>
    </footer>
  );
}
