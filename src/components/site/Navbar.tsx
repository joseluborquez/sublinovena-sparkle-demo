import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, Star, X } from "lucide-react";
import logo from "@/assets/sublinovena-icon.png";
import { categories } from "@/data/products";
import { siteConfig, waLink } from "@/lib/site-config";
import { WhatsappIcon } from "./WhatsappIcon";
import { GoogleIcon } from "./GoogleIcon";
import { googleRating, googleReviewCount } from "./GoogleReviews";

const productCategories = categories.filter((c) => c !== "Todos");

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!productsOpen) return;
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [productsOpen]);

  const solid = scrolled || !isHome;

  function goToCatalog(params: { q?: string | undefined; cat?: string | undefined }) {
    navigate({ to: "/catalogo", search: params });
    setMenu(false);
    setProductsOpen(false);
    setMobileProductsOpen(false);
  }

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();
    goToCatalog({ q: query.trim() || undefined });
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-ink shadow-[0_10px_40px_-24px_rgba(0,0,0,0.9)]" : "bg-transparent"
      }`}
    >
      <a
        href={siteConfig.googleReviewsUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="flex items-center justify-center gap-1.5 bg-ink-soft/80 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur transition-colors hover:text-white sm:text-xs"
      >
        Excelente {googleRating.toLocaleString("es-CL", { minimumFractionDigits: 1 })} de 5 en
        <GoogleIcon className="size-3.5 shrink-0" />
        <span className="hidden sm:inline">Google</span>
        <span className="flex gap-0.5 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={10} fill="currentColor" strokeWidth={0} />
          ))}
        </span>
        <span className="hidden text-white/55 sm:inline">({googleReviewCount} reseñas)</span>
      </a>

      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:px-8">
        <Link to="/" hash="top" className="flex min-w-0 items-center gap-3">
          <img
            src={logo}
            alt="Sublinovena Merchandising"
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full"
          />
          <span className="font-brand truncate text-sm font-semibold uppercase tracking-[0.3em] text-white">
            Sublinovena
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative hidden lg:block">
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar producto…"
              className="w-48 rounded-full border border-white/15 bg-white/5 py-2 pl-9 pr-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/40 focus:w-60 focus:border-white/30"
            />
          </form>

          <ul className="mr-2 hidden items-center gap-6 lg:flex">
            <li>
              <Link
                to="/"
                hash="top"
                className="text-sm text-white/80 transition-colors duration-300 hover:text-cyan"
              >
                Inicio
              </Link>
            </li>
            <li ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setProductsOpen((v) => !v)}
                aria-expanded={productsOpen}
                className="flex items-center gap-1 text-sm text-white/80 transition-colors duration-300 hover:text-cyan"
              >
                Productos
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`}
                />
              </button>
              {productsOpen && (
                <div className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-2xl border border-white/10 bg-ink p-2 shadow-2xl">
                  <button
                    type="button"
                    onClick={() => goToCatalog({ cat: undefined })}
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-white transition-colors hover:bg-white/5 hover:text-cyan"
                  >
                    Ver todo el catálogo
                  </button>
                  <div className="my-1 border-t border-white/10" />
                  <div className="max-h-72 overflow-y-auto">
                    {productCategories.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => goToCatalog({ cat: c })}
                        className="block w-full rounded-xl px-3 py-2 text-left text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-cyan"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </li>
            <li>
              <Link
                to="/"
                hash="contacto"
                className="text-sm text-white/80 transition-colors duration-300 hover:text-cyan"
              >
                Contacto
              </Link>
            </li>
          </ul>

          <a
            href={waLink("Hola, vengo de la página web y quiero cotizar")}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-all duration-300 hover:border-leaf hover:text-leaf sm:flex"
          >
            <WhatsappIcon className="size-4 shrink-0" /> WhatsApp
          </a>

          <Link to="/catalogo" className="btn-brand hidden text-sm lg:inline-flex">
            Ver catálogo
          </Link>

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
        className={`overflow-hidden bg-ink/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          menu ? "max-h-[32rem] overflow-y-auto border-t border-white/5" : "max-h-0 border-t-0"
        }`}
      >
        <div className="px-6 pt-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar producto…"
              className="w-full rounded-full border border-white/15 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/30"
            />
          </form>
        </div>

        <ul className="space-y-1 px-6 py-4">
          <li>
            <Link
              to="/"
              hash="top"
              onClick={() => setMenu(false)}
              className="block py-2 text-white/85 transition-colors hover:text-cyan"
            >
              Inicio
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setMobileProductsOpen((v) => !v)}
              aria-expanded={mobileProductsOpen}
              className="flex w-full items-center justify-between py-2 text-left text-white/85 transition-colors hover:text-cyan"
            >
              Productos
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${mobileProductsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileProductsOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="space-y-1 py-1 pl-3">
                <button
                  type="button"
                  onClick={() => goToCatalog({ cat: undefined })}
                  className="block w-full py-1.5 text-left text-sm font-semibold text-white/90 hover:text-cyan"
                >
                  Ver todo el catálogo
                </button>
                {productCategories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => goToCatalog({ cat: c })}
                    className="block w-full py-1.5 text-left text-sm text-white/65 hover:text-cyan"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </li>
          <li>
            <Link
              to="/"
              hash="contacto"
              onClick={() => setMenu(false)}
              className="block py-2 text-white/85 transition-colors hover:text-cyan"
            >
              Contacto
            </Link>
          </li>
          <li className="pt-2">
            <a
              href={waLink("Hola, vengo de la página web y quiero cotizar")}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenu(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm text-white transition-colors hover:border-leaf hover:text-leaf"
            >
              <WhatsappIcon className="size-4 shrink-0" /> WhatsApp
            </a>
          </li>
          <li className="pt-2">
            <Link to="/catalogo" onClick={() => setMenu(false)} className="btn-brand w-full">
              Ver catálogo
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
