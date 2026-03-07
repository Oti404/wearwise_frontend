import { Top } from '../models/wardrobe';
import { Sezon } from '../models/sezon.enum';
import { Stil } from '../models/style.enum';
import { Mood } from '../models/mood.enum';
import { Vreme } from '../models/weather.enum';
import { Eveniment } from '../models/events.enum';
import { Fit } from '../models/fit.enum';

export const TOPURI_DATA: Top[] = [
  {
    cod_articol: "9856/660/800",
    model: "TOP TIP CORSET CU FERMOAR",
    pret_ron: 119.90,
    culoare: "Negru",
    img_url: "wardrobe/top/top1.jpg",
    marimi_disponibile: ["XS", "S", "M", "L"],
    sezon: [Sezon.ALL_SEASON],
    stil_general: [Stil.ELEGANT, Stil.STRUCTURED],
    ocazie: [Eveniment.PARTY, Eveniment.EVENING],
    mood: [Mood.BOLD, Mood.CONFIDENT, Mood.MYSTERIOUS, Mood.PARTY],
    vreme: [Vreme.SUNNY, Vreme.CLOUDY],
    fit: Fit.FITTED,
    detalii: { stil: "Corset / Cambrată", inchidere: ["fermoar frontal"], tip_maneca: "Fără mâneci" }
  },
  {
    cod_articol: "3253/301/250-1",
    model: "TOP FĂRĂ MÂNECĂ RIB",
    pret_ron: 29.90,
    culoare: "Alb",
    img_url: "wardrobe/top/top2.jpg",
    marimi_disponibile: ["S", "M", "L"],
    sezon: [Sezon.VARA, Sezon.PRIMAVARA_VARA],
    stil_general: [Stil.CASUAL, Stil.MINIMALIST],
    ocazie: [Eveniment.DAILY, Eveniment.BEACH, Eveniment.BRUNCH],
    mood: [Mood.CHILL, Mood.MINIMALIST, Mood.ENERGETIC],
    vreme: [Vreme.SUNNY],
    fit: Fit.FITTED,
    detalii: { stil: "Rib", inchidere: [], tip_maneca: "Fără mâneci" }
  },
  {
    cod_articol: "3253/301/250-2",
    model: "TOP FĂRĂ MÂNECĂ RIB (V2)",
    pret_ron: 29.90,
    culoare: "Alb",
    img_url: "wardrobe/top/top3.jpg",
    marimi_disponibile: ["S", "M", "L"],
    sezon: [Sezon.VARA, Sezon.PRIMAVARA_VARA],
    stil_general: [Stil.CASUAL, Stil.BASIC],
    ocazie: [Eveniment.DAILY, Eveniment.BEACH],
    mood: [Mood.CHILL, Mood.MINIMALIST],
    vreme: [Vreme.SUNNY],
    fit: Fit.FITTED,
    detalii: { stil: "Rib", inchidere: [], tip_maneca: "Fără mâneci" }
  },
  {
    cod_articol: "3641/871/700",
    model: "TOP FĂRĂ MÂNECĂ",
    pret_ron: 39.90,
    culoare: "Maro",
    img_url: "wardrobe/top/top4.jpg",
    marimi_disponibile: ["S", "M", "L"],
    sezon: [Sezon.VARA, Sezon.PRIMAVARA_VARA, Sezon.PRIMAVARA_TOAMNA],
    stil_general: [Stil.CASUAL, Stil.EARTH_TONES],
    ocazie: [Eveniment.DAILY, Eveniment.BRUNCH, Eveniment.CASUAL_OUTING],
    mood: [Mood.CHILL, Mood.VINTAGE, Mood.MINIMALIST],
    vreme: [Vreme.SUNNY, Vreme.CLOUDY],
    fit: Fit.FITTED,
    detalii: { stil: "Mulat", inchidere: [], tip_maneca: "Fără mâneci" }
  },
  {
    cod_articol: "5755/043/052",
    model: "TOP TRICOT CU NOD",
    pret_ron: 149.90,
    culoare: "Bej deschis",
    img_url: "wardrobe/top/top5.jpg",
    marimi_disponibile: ["S", "M", "L"],
    sezon: [Sezon.PRIMAVARA_TOAMNA],
    stil_general: [Stil.CHIC, Stil.KNITWEAR],
    ocazie: [Eveniment.DATE, Eveniment.OFFICE, Eveniment.BRUNCH],
    mood: [Mood.ROMANTIC, Mood.CONFIDENT, Mood.MAIN_CHARACTER, Mood.TRENDY],
    vreme: [Vreme.CLOUDY],
    fit: Fit.FITTED,
    detalii: { stil: "Tricot cu nod", inchidere: [], tip_maneca: "Fără mâneci" }
  },
  {
    cod_articol: "NEW-T006",
    model: "TOP STRUCTURAT CU EFECT SCLIPITOR",
    pret_ron: 89.90,
    culoare: "Maro taupe",
    img_url: "wardrobe/top/top6.jpg",
    marimi_disponibile: ["S", "M", "L"],
    sezon: [Sezon.ALL_SEASON],
    stil_general: [Stil.CHIC, Stil.GLAM],
    ocazie: [Eveniment.EVENING, Eveniment.PARTY, Eveniment.DATE],
    mood: [Mood.BOLD, Mood.MAIN_CHARACTER, Mood.PARTY, Mood.CONFIDENT],
    vreme: [Vreme.SUNNY, Vreme.CLOUDY],
    fit: Fit.FITTED,
    detalii: { stil: "Texturat / Sclipitor", inchidere: [], tip_maneca: "Mânecă foarte scurtă / Cap sleeve" }
  }
];