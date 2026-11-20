import type { Product } from "@/data/products";

// Minúsculas y sin tildes/diacríticos: "Botella Térmica" -> "botella termica".
export function normalizeText(input: string): string {
  return input.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function words(input: string): string[] {
  return normalizeText(input)
    .split(/[^a-z0-9ñ]+/)
    .filter(Boolean);
}

// "lapices" -> "lapic", "mochilas" -> "mochila": tolera plurales/singulares.
function stem(word: string): string {
  if (word.length > 4 && word.endsWith("es")) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith("s")) return word.slice(0, -1);
  return word;
}

// Distancia de edición <= 1 (una letra de más, de menos o distinta).
function withinOneEdit(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else {
      i++;
      j++;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

function tokenMatches(token: string, haystack: string, haystackWords: string[]): boolean {
  const t = stem(token);
  if (haystack.includes(t)) return true;
  // Tolerancia a errores de tipeo solo en palabras largas, comparando con el inicio de cada palabra.
  if (t.length >= 5) {
    return haystackWords.some(
      (w) => withinOneEdit(t, w) || (w.length > t.length && withinOneEdit(t, w.slice(0, t.length))),
    );
  }
  return false;
}

// Todas las palabras de la búsqueda deben aparecer (en cualquier orden), sin importar
// tildes, mayúsculas, plurales ni un error de tipeo en palabras largas.
export function matchesSearch(fields: Array<string | undefined | null>, query: string): boolean {
  const tokens = words(query);
  if (tokens.length === 0) return true;
  const text = fields.filter((f): f is string => !!f).join(" ");
  const haystack = normalizeText(text);
  const haystackWords = words(text);
  return tokens.every((t) => tokenMatches(t, haystack, haystackWords));
}

export function productMatches(p: Product, query: string): boolean {
  return matchesSearch([p.name, p.category, p.topCategory, p.sku], query);
}
