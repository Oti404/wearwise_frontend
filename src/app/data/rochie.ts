import { Rochie } from '../models/wardrobe';
import { Sezon } from '../models/sezon.enum';
import { Stil } from '../models/style.enum';
import { Mood } from '../models/mood.enum';
import { Vreme } from '../models/weather.enum';
import { Eveniment } from '../models/events.enum';
import { Fit } from '../models/fit.enum';

export const ROCHII_DATA: Rochie[] = [
  {
    cod_articol: "2534/111/250",
    model: "ROCHIE TIP CORSET VOLUMINOASĂ",
    pret_ron: 149.90,
    culoare: "Alb",
    lungime: "Scurtă",
    img_url: "wardrobe/rochie/rochie1.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL", "XXL"],
    sezon: [Sezon.VARA, Sezon.PRIMAVARA_VARA],
    stil_general: [Stil.ELEGANT, Stil.PARTY],
    ocazie: [Eveniment.EVENING, Eveniment.PARTY, Eveniment.WEDDING],
    mood: [Mood.BOLD, Mood.CONFIDENT, Mood.PARTY, Mood.MAIN_CHARACTER],
    vreme: [Vreme.SUNNY],
    fit: Fit.FITTED,
    detalii: { tip_talie: "standard", inchidere: ["fermoar lateral ascuns"], stil: "Voluminoasă" }
  },
  {
    cod_articol: "2310/002/250",
    model: "ROCHIE MIDI CU SPATELE GOL",
    pret_ron: 169.90,
    culoare: "Alb",
    lungime: "Midi",
    img_url: "wardrobe/rochie/rochie2.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL", "XXL"],
    sezon: [Sezon.VARA],
    stil_general: [Stil.CHIC, Stil.MINIMALIST],
    ocazie: [Eveniment.DATE, Eveniment.PARTY, Eveniment.EVENING],
    mood: [Mood.ROMANTIC, Mood.MAIN_CHARACTER, Mood.CONFIDENT, Mood.TRENDY],
    vreme: [Vreme.SUNNY],
    fit: Fit.REGULAR,
    detalii: { tip_talie: "standard", inchidere: ["fermoar ascuns în cusătură", "șnur la guler"], stil: "Spate gol" }
  },
  {
    cod_articol: "2298/057/330",
    model: "ROCHIE CU IMPRIMEU FLORAL ȘI CUREA",
    pret_ron: 229.90,
    culoare: "Multicolor",
    lungime: "Midi",
    img_url: "wardrobe/rochie/rochie3.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL"],
    sezon: [Sezon.PRIMAVARA_TOAMNA, Sezon.PRIMAVARA_VARA],
    stil_general: [Stil.ROMANTIC, Stil.BOHO],
    ocazie: [Eveniment.DAILY, Eveniment.BRUNCH, Eveniment.CASUAL_OUTING],
    mood: [Mood.ROMANTIC, Mood.CHILL, Mood.ENERGETIC, Mood.TRENDY],
    vreme: [Vreme.SUNNY, Vreme.CLOUDY],
    fit: Fit.FLARED,
    detalii: { tip_talie: "elastică", inchidere: [], stil: "Imprimeu floral / Plisată" }
  },
  {
    cod_articol: "9598/020/087",
    model: "ROCHIE DIN TRICOT CU BULINE",
    pret_ron: 169.90,
    culoare: "Maro / Ecru",
    lungime: "Lungă",
    img_url: "wardrobe/rochie/rochie4.jpg",
    marimi_disponibile: ["S", "M", "L", "XL"],
    sezon: [Sezon.PRIMAVARA_TOAMNA],
    stil_general: [Stil.CASUAL, Stil.VINTAGE],
    ocazie: [Eveniment.DAILY, Eveniment.OFFICE, Eveniment.BRUNCH],
    mood: [Mood.VINTAGE, Mood.CHILL, Mood.PRODUCTIVE],
    vreme: [Vreme.CLOUDY],
    fit: Fit.REGULAR,
    detalii: { tip_talie: "fără", inchidere: [], stil: "Tricot cu buline" }
  },
  {
    cod_articol: "3564/084/070",
    model: "ROCHIE MIDI COMBINATĂ CU DUNGĂ ȘI CUREA",
    pret_ron: 229.90,
    culoare: "Ecru / Negru",
    lungime: "Midi",
    img_url: "wardrobe/rochie/rochie5.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL"],
    sezon: [Sezon.ALL_SEASON],
    stil_general: [Stil.OFFICE, Stil.CLASSIC],
    ocazie: [Eveniment.OFFICE, Eveniment.BUSINESS],
    mood: [Mood.CONFIDENT, Mood.PRODUCTIVE, Mood.MINIMALIST],
    vreme: [Vreme.CLOUDY, Vreme.COLD],
    fit: Fit.REGULAR,
    detalii: { tip_talie: "cu curea", inchidere: ["fermoar lateral ascuns", "nasturi frontali"], stil: "Combinată cu dungă" }
  },
  {
    cod_articol: "NEW-R006",
    model: "FUSTĂ DIN TRICOT CU INIMI",
    pret_ron: 129.90,
    culoare: "Alb / Roșu",
    lungime: "Scurtă",
    img_url: "wardrobe/rochie/rochie6.jpg",
    marimi_disponibile: ["S", "M", "L"],
    sezon: [Sezon.IARNA_PRIMAVARA, Sezon.PRIMAVARA_TOAMNA],
    stil_general: [Stil.ROMANTIC, Stil.CASUAL],
    ocazie: [Eveniment.DAILY, Eveniment.DATE, Eveniment.BRUNCH],
    mood: [Mood.ROMANTIC, Mood.CHILL, Mood.TRENDY],
    vreme: [Vreme.CLOUDY, Vreme.COLD],
    fit: Fit.REGULAR,
    detalii: { tip_talie: "înaltă / elastică", inchidere: [], stil: "Tricot jacquard" }
  },
  {
    cod_articol: "NEW-R007",
    model: "BODYSUIT TIP SHORT REIAT",
    pret_ron: 119.90,
    culoare: "Albastru deschis",
    lungime: "Scurtă",
    img_url: "wardrobe/rochie/rochie7.jpg",
    marimi_disponibile: ["XS", "S", "M", "L"],
    sezon: [Sezon.VARA, Sezon.PRIMAVARA_VARA],
    stil_general: [Stil.SPORTY, Stil.CASUAL],
    ocazie: [Eveniment.GYM, Eveniment.DAILY, Eveniment.BEACH],
    mood: [Mood.SPORTY, Mood.ENERGETIC, Mood.CHILL],
    vreme: [Vreme.SUNNY],
    fit: Fit.FITTED,
    detalii: { tip_talie: "fără", inchidere: [], stil: "Seamless / Reiat" }
  },
  {
    cod_articol: "NEW-R008",
    model: "TOP/ROCHIE TIP TUB ELASTICĂ",
    pret_ron: 79.90,
    culoare: "Violet / Indigo",
    lungime: "Scurtă",
    img_url: "wardrobe/rochie/rochie8.jpg",
    marimi_disponibile: ["S", "M", "L"],
    sezon: [Sezon.VARA],
    stil_general: [Stil.MINIMALIST, Stil.PARTY],
    ocazie: [Eveniment.PARTY, Eveniment.EVENING, Eveniment.BEACH],
    mood: [Mood.BOLD, Mood.PARTY, Mood.MYSTERIOUS, Mood.MAIN_CHARACTER],
    vreme: [Vreme.SUNNY],
    fit: Fit.FITTED,
    detalii: { tip_talie: "standard", inchidere: [], stil: "Bandeau / Elastic" }
  }
];