import { Sacou } from '../models/wardrobe';
import { Sezon } from '../models/sezon.enum';
import { Stil } from '../models/style.enum';
import { Mood } from '../models/mood.enum';
import { Vreme } from '../models/weather.enum';
import { Eveniment } from '../models/events.enum';
import { Fit } from '../models/fit.enum';

export const SACOURI_DATA: Sacou[] = [
  {
    cod_articol: "2329/597/700",
    model: "SACOU SPIȚĂ CUREA",
    pret_ron: 269.90,
    culoare: "Maro",
    img_url: "wardrobe/sacou/sacou1.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL"],
    sezon: [Sezon.PRIMAVARA_TOAMNA],
    stil_general: [Stil.ELEGANT, Stil.CLASSIC],
    ocazie: [Eveniment.OFFICE, Eveniment.BUSINESS],
    mood: [Mood.CONFIDENT, Mood.PRODUCTIVE, Mood.MAIN_CHARACTER],
    vreme: [Vreme.CLOUDY],
    fit: Fit.REGULAR,
    detalii: { inchidere: ["nasturi"], buzunare: 2, extra: "curea" }
  },
  {
    cod_articol: "2253/599/800",
    model: "SACOU CAMBRAT CU EPAOLEȚI",
    pret_ron: 249.90,
    culoare: "Negru",
    img_url: "wardrobe/sacou/sacou2.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL"],
    sezon: [Sezon.ALL_SEASON],
    stil_general: [Stil.ELEGANT, Stil.STRUCTURED],
    ocazie: [Eveniment.OFFICE, Eveniment.EVENING, Eveniment.BUSINESS],
    mood: [Mood.BOLD, Mood.CONFIDENT, Mood.MYSTERIOUS, Mood.MAIN_CHARACTER],
    vreme: [Vreme.CLOUDY, Vreme.COLD],
    fit: Fit.FITTED,
    detalii: { inchidere: ["nasture"], buzunare: 0, extra: "epaoleți" }
  },
  {
    cod_articol: "2753/122/800",
    model: "SACOU PETRECUT OVERSIZE",
    pret_ron: 199.90,
    culoare: "Negru",
    img_url: "wardrobe/sacou/sacou3.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL"],
    sezon: [Sezon.ALL_SEASON],
    stil_general: [Stil.MODERN, Stil.STREETWEAR],
    ocazie: [Eveniment.DAILY, Eveniment.CASUAL_OUTING],
    mood: [Mood.BOLD, Mood.TRENDY, Mood.MAIN_CHARACTER, Mood.ENERGETIC],
    vreme: [Vreme.CLOUDY, Vreme.COLD],
    fit: Fit.OVERSIZED,
    detalii: { inchidere: ["nasturi", "petrecută"], buzunare: 2, extra: "lungime lungă" }
  },
  {
    cod_articol: "2395/582/401",
    model: "SACOU CU DUNGI FINE",
    pret_ron: 229.90,
    culoare: "Bleumarin",
    img_url: "wardrobe/sacou/sacou4.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL"],
    sezon: [Sezon.PRIMAVARA_TOAMNA],
    stil_general: [Stil.PROFESSIONAL, Stil.CLASSIC],
    ocazie: [Eveniment.OFFICE, Eveniment.BUSINESS],
    mood: [Mood.CONFIDENT, Mood.PRODUCTIVE, Mood.MINIMALIST],
    vreme: [Vreme.CLOUDY],
    fit: Fit.FITTED,
    detalii: { inchidere: ["nasture"], buzunare: 0, extra: "dungi fine" }
  },
  {
    cod_articol: "8531/597/712",
    model: "SACOU CAMBRAT FĂRĂ REVER",
    pret_ron: 249.90,
    culoare: "Ecru",
    img_url: "wardrobe/sacou/sacou5.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL"],
    sezon: [Sezon.VARA, Sezon.PRIMAVARA_VARA],
    stil_general: [Stil.CHIC, Stil.MINIMALIST],
    ocazie: [Eveniment.WEDDING, Eveniment.PARTY, Eveniment.OFFICE],
    mood: [Mood.CONFIDENT, Mood.MAIN_CHARACTER, Mood.MINIMALIST, Mood.TRENDY],
    vreme: [Vreme.SUNNY, Vreme.CLOUDY],
    fit: Fit.FITTED,
    detalii: { inchidere: ["un nasture"], buzunare: 2, extra: "fără rever" }
  }
];