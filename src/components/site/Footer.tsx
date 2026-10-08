import { Instagram, Mail, MapPin } from "lucide-react";
import logo from "@/assets/sublinovena-icon.png";
import { siteConfig, waLink } from "@/lib/site-config";
import { WhatsappIcon } from "./WhatsappIcon";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer id="contacto" className="relative bg-ink text-white">
      <div className="rule-brand" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <Reveal className="lg:col-span-2">
          <img
            src={logo}
            alt="Sublinovena Merchandising"
            width={72}
            height={72}
            loading="lazy"
            className="size-16 rounded-full"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            Fabricamos merchandising corporativo personalizado para empresas en todo Chile: acabados
            de calidad y acompañamiento real, desde el primer WhatsApp hasta la entrega.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h3 className="font-brand text-xs font-bold uppercase tracking-[0.3em] text-magenta">
            Navegación
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {[
              ["/catalogo", "Catálogo"],
              ["/#como-cotizar", "Cómo cotizar"],
              ["/#preguntas-frecuentes", "Preguntas frecuentes"],
              ["/blog", "Blog"],
              ["/about", "Quiénes somos"],
              ["/#top", "Inicio"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-magenta">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={200}>
          <h3 className="font-brand text-xs font-bold uppercase tracking-[0.3em] text-magenta">
            Contacto
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            <li className="flex items-center gap-2">
              <Mail size={15} className="shrink-0 text-cyan" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-magenta">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <WhatsappIcon className="size-4 shrink-0 text-leaf" />
              <a
                href={waLink("Hola, vengo de la página web y quiero cotizar")}
                target="_blank"
                rel="noreferrer"
                className="hover:text-magenta"
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
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition-colors hover:border-magenta hover:text-magenta"
              >
                <Instagram size={15} /> @sublinovena
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-magenta">
                Página de contacto
              </a>
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 border-t border-white/10 px-5 py-6 text-center text-xs text-white/40 lg:flex-row lg:justify-between lg:px-8">
        <span>
          © {new Date().getFullYear()} {siteConfig.legalName} · Temuco, Chile
        </span>
        <a href="/privacy" className="hover:text-magenta">
          Política de privacidad
        </a>
      </div>
    </footer>
  );
}
