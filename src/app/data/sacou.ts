import { Sacou } from '../models/wardrobe';
import { Sezon } from '../models/sezon.enum';
import { Stil } from '../models/style.enum';

export const SACOURI_DATA: Sacou[] = [
  {
    cod_articol: "2329/597/700",
    model: "SACOU SPIȚĂ CUREA",
    pret_ron: 269.90,
    culoare: "Maro",
    croiala: "Standard",
    img_url: "wardrobe/sacou/sacou1.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL"],
    sezon: Sezon.PRIMAVARA_TOAMNA,
    stil_general: [Stil.ELEGANT, Stil.CLASSIC],
    ocazie: ["office", "business"],
    detalii: {
      inchidere: ["nasturi"],
      buzunare: 2,
      extra: "curea"
    }
  },
  {
    cod_articol: "2253/599/800",
    model: "SACOU CAMBRAT CU EPAOLEȚI",
    pret_ron: 249.90,
    culoare: "Negru",
    croiala: "Cambrat",
    img_url: "wardrobe/sacou/sacou2.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL"],
    sezon: Sezon.ALL_SEASON,
    stil_general: [Stil.ELEGANT, Stil.STRUCTURED],
    ocazie: ["office", "evening"],
    detalii: {
      inchidere: ["nasture"],
      buzunare: 0,
      extra: "epaoleți"
    }
  },
  {
    cod_articol: "2753/122/800",
    model: "SACOU PETRECUT OVERSIZE",
    pret_ron: 199.90,
    culoare: "Negru",
    croiala: "Oversize",
    img_url: "wardrobe/sacou/sacou3.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL"],
    sezon: Sezon.ALL_SEASON,
    stil_general: [Stil.MODERN, Stil.STREETWEAR],
    ocazie: ["daily", "casual"],
    detalii: {
      inchidere: ["nasturi", "petrecută"],
      buzunare: 2,
      extra: "lungime lungă"
    }
  },
  {
    cod_articol: "2395/582/401",
    model: "SACOU CU DUNGI FINE",
    pret_ron: 229.90,
    culoare: "Bleumarin",
    croiala: "Cambrat",
    img_url: "wardrobe/sacou/sacou4.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL"],
    sezon: Sezon.PRIMAVARA_TOAMNA,
    stil_general: [Stil.PROFESSIONAL, Stil.CLASSIC],
    ocazie: ["office", "business meeting"],
    detalii: {
      inchidere: ["nasture"],
      buzunare: 0,
      extra: "dungi fine"
    }
  },
  {
    cod_articol: "8531/597/712",
    model: "SACOU CAMBRAT FĂRĂ REVER",
    pret_ron: 249.90,
    culoare: "Ecru",
    croiala: "Cambrat",
    img_url: "wardrobe/sacou/sacou5.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL"],
    sezon: Sezon.VARA,
    stil_general: [Stil.CHIC, Stil.MINIMALIST],
    ocazie: ["wedding", "party", "office"],
    detalii: {
      inchidere: ["un nasture"],
      buzunare: 2,
      extra: "fără rever"
    }
  }
];