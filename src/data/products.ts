import taza from "@/assets/prod-taza.jpg";
import polera from "@/assets/prod-polera.jpg";
import mochila from "@/assets/prod-mochila.jpg";
import libreta from "@/assets/prod-libreta.jpg";
import botella from "@/assets/prod-botella.jpg";
import tech from "@/assets/prod-tech.jpg";
import accesorios from "@/assets/prod-accesorios.jpg";
import vestuario from "@/assets/prod-vestuario.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  min: number;
  image: string;
  note: string;
};

export const categories = [
  "Todos",
  "Tazas",
  "Poleras",
  "Mochilas",
  "Libretas",
  "Botellas",
  "Accesorios tech",
  "Vestuario",
] as const;

export const products: Product[] = [
  {
    id: "taza-sublimada",
    name: "Taza cerámica sublimada",
    category: "Tazas",
    min: 1000,
    image: taza,
    note: "Impresión full color 360°",
  },
  {
    id: "taza-mate",
    name: "Taza mate premium",
    category: "Tazas",
    min: 1000,
    image: taza,
    note: "Acabado soft touch grabado láser",
  },
  {
    id: "polera-algodon",
    name: "Polera algodón peinado",
    category: "Poleras",
    min: 1200,
    image: polera,
    note: "Serigrafía o DTF, tallas S-XXL",
  },
  {
    id: "polera-corporativa",
    name: "Polera corporativa cuello polo",
    category: "Poleras",
    min: 1000,
    image: polera,
    note: "Bordado de logo en pecho",
  },
  {
    id: "mochila-urbana",
    name: "Mochila urbana antirrobo",
    category: "Mochilas",
    min: 1000,
    image: mochila,
    note: "Puerto USB y bolsillo notebook 15\"",
  },
  {
    id: "libreta-elastico",
    name: "Libreta tapa dura con elástico",
    category: "Libretas",
    min: 1500,
    image: libreta,
    note: "Hoja interior personalizable",
  },
  {
    id: "botella-termica",
    name: "Botella térmica acero 750 ml",
    category: "Botellas",
    min: 1000,
    image: botella,
    note: "Grabado láser permanente",
  },
  {
    id: "botella-deportiva",
    name: "Botella deportiva tapa flip",
    category: "Botellas",
    min: 1500,
    image: botella,
    note: "Libre de BPA, 12 colores",
  },
  {
    id: "cargador-inalambrico",
    name: "Cargador inalámbrico 15W",
    category: "Accesorios tech",
    min: 1000,
    image: tech,
    note: "Impresión UV del logo",
  },
  {
    id: "kit-tech",
    name: "Kit tech: pendrive + cable",
    category: "Accesorios tech",
    min: 1000,
    image: tech,
    note: "Estuche de regalo incluido",
  },
  {
    id: "tote-lanyard",
    name: "Tote bag + credencial",
    category: "Mochilas",
    min: 1500,
    image: accesorios,
    note: "Ideal para congresos y ferias",
  },
  {
    id: "chaqueta-softshell",
    name: "Chaqueta softshell + gorro",
    category: "Vestuario",
    min: 1000,
    image: vestuario,
    note: "Bordado institucional",
  },
];
