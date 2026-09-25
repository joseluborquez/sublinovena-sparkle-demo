import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/sublinovena-icon.png";
import { waLink } from "@/lib/site-config";
import { useQuote } from "./QuoteProvider";
import { WhatsappIcon } from "./WhatsappIcon";

const links = [
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/#como-cotizar", label: "Cómo cotizar" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/#contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { open } = useQuote();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-ink/90 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:px-8">
        <a href="/#top" className="flex min-w-0 items-center gap-3">
          <img
            src={logo}
            alt="Sublinovena Merchandising"
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full"
          />
          <span className="truncate text-sm font-semibold uppercase tracking-[0.3em] text-white">
            Sublinovena
          </span>
        </a>

        <div className="flex items-center gap-2">
          <ul className="mr-2 hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-white/80 transition-colors duration-300 hover:text-lavender"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            aria-label="Escríbenos por WhatsApp"
            className="grid size-10 place-items-center rounded-full border border-white/15 text-white transition-all duration-300 hover:border-leaf hover:text-leaf"
          >
            <WhatsappIcon className="size-5" />
          </a>

          <button onClick={() => open()} className="btn-brand hidden text-sm sm:inline-flex">
            Cotizar ahora
          </button>

          <button
            onClick={() => setMenu((v) => !v)}
            aria-label="Abrir menú"
            className="grid size-10 place-items-center rounded-full border border-white/15 text-white lg:hidden"
          >
            {menu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-white/5 bg-ink/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          menu ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="space-y-1 px-6 py-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenu(false)}
                className="block py-2 text-white/85 transition-colors hover:text-lavender"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <button
              onClick={() => {
                setMenu(false);
                open();
              }}
              className="btn-brand w-full"
            >
              Cotizar ahora
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
