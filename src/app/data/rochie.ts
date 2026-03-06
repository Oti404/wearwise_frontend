import { Rochie } from '../models/wardrobe';

export const ROCHII_DATA: Rochie[] = [
  {
    cod_articol: "2534/111/250",
    model: "ROCHIE TIP CORSJ VOLUMINOASĂ",
    pret_ron: 149.90,
    culoare: "Alb",
    lungime: "Scurtă",
    img_url: "wardrobe/rochie/rochie1.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL", "XXL"],
    sezon: "Vară",
    stil_general: ["elegant", "party"],
    ocazie: ["evening", "cocktail"],
    detalii: {
      tip_talie: "standard",
      inchidere: ["fermoar lateral ascuns"],
      stil: "Voluminoasă"
    }
  },
  {
    cod_articol: "2310/002/250",
    model: "ROCHIE MIDI CU SPATELE GOL",
    pret_ron: 169.90,
    culoare: "Alb",
    lungime: "Midi",
    img_url: "wardrobe/rochie/rochie2.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL", "XXL"],
    sezon: "Vară",
    stil_general: ["chic", "minimalist"],
    ocazie: ["date night", "summer party"],
    detalii: {
      tip_talie: "standard",
      inchidere: ["fermoar ascuns în cusătură", "șnur la guler"],
      stil: "Spate gol"
    }
  },
  {
    cod_articol: "2298/057/330",
    model: "ROCHIE CU IMPRIMEU FLORAL ȘI CUREA",
    pret_ron: 229.90,
    culoare: "Multicolor",
    lungime: "Midi",
    img_url: "wardrobe/rochie/rochie3.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL"],
    sezon: "Primăvară/Toamnă",
    stil_general: ["romantic", "boho"],
    ocazie: ["daily", "brunch"],
    detalii: {
      tip_talie: "elastică",
      inchidere: [],
      stil: "Imprimeu floral / Plisată"
    }
  },
  {
    cod_articol: "9598/020/087",
    model: "ROCHIE DIN TRICOT CU BULINE",
    pret_ron: 169.90,
    culoare: "Maro / Ecru",
    lungime: "Lungă",
    img_url: "wardrobe/rochie/rochie4.jpg",
    marimi_disponibile: ["S", "M", "L", "XL"],
    sezon: "Primăvară/Toamnă",
    stil_general: ["casual", "vintage"],
    ocazie: ["daily", "office"],
    detalii: {
      tip_talie: "fără",
      inchidere: [],
      stil: "Tricot cu buline"
    }
  },
  {
    cod_articol: "3564/084/070",
    model: "ROCHIE MIDI COMBINATĂ CU DUNGĂ ȘI CUREA",
    pret_ron: 229.90,
    culoare: "Ecru / Negru",
    lungime: "Midi",
    img_url: "wardrobe/rochie/rochie5.jpg",
    marimi_disponibile: ["XS", "S", "M", "L", "XL"],
    sezon: "All Season",
    stil_general: ["office", "classic"],
    ocazie: ["work", "business meeting"],
    detalii: {
      tip_talie: "cu curea",
      inchidere: ["fermoar lateral ascuns", "nasturi frontali"],
      stil: "Combinată cu dungă"
    }
  }
];