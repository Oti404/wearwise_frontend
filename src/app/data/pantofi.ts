import { Pantof } from '../models/wardrobe';
import { Sezon } from '../models/sezon.enum';
import { Stil } from '../models/style.enum';

export const PANTOFI_DATA: Pantof[] = [
    {
        cod_articol: "1283/710/102",
        model: "PANTOFI ASIMETRICI CU TOC DIN CATIFEA",
        pret_ron: 199.90,
        culoare: "Bej",
        img_url: "wardrobe/pantofi/pantofi1.jpg",
        marimi_disponibile: ["35", "36", "37", "38", "39", "40", "41", "42"],
        sezon: Sezon.PRIMAVARA_TOAMNA,
        stil_general: [Stil.ELEGANT, Stil.PARTY],
        ocazie: ['wedding', 'gala'],
        detalii: { tip_pantof: "Pantofi cu toc", inchidere: ["cataramă reglabilă"], material: "Catifea" }
    },
    {
        cod_articol: "1212/710/105",
        model: "PANTOFI FĂRĂ TOC CU BARETĂ LA SPATE",
        pret_ron: 199.90,
        culoare: "Maro",
        img_url: "wardrobe/pantofi/pantofi2.jpg",
        marimi_disponibile: ["35", "36", "37", "38", "39", "40", "41", "42"],
        sezon: Sezon.PRIMAVARA_TOAMNA,
        stil_general: [Stil.OFFICE, Stil.CASUAL],
        ocazie: ['business', 'daily'],
        detalii: { tip_pantof: "Pantofi fara toc", inchidere: ["baretă la spate cu inserție elastică"], material: "Piele întoarsă" }
    },
    {
        cod_articol: "2537/610/116",
        model: "BALERINI DIN PIELE ÎNTOARSĂ",
        pret_ron: 199.90,
        culoare: "Maro-ciocolatiu",
        img_url: "wardrobe/pantofi/pantofi3.jpg",
        marimi_disponibile: ["35", "36", "37", "38", "39", "40", "41", "42"],
        sezon: Sezon.PRIMAVARA_TOAMNA,
        stil_general: [Stil.CASUAL, Stil.OFFICE],
        ocazie: ['daily', 'business'],
        detalii: { tip_pantof: "Balerini", inchidere: ["cataramă pe partea superioară"], material: "Piele întoarsă" }
    },
    {
        cod_articol: "2242/710/600",
        model: "PANTOFI DIN PIELE CU TOC ȘI BARETĂ LA SPATE",
        pret_ron: 199.90,
        culoare: "Roșu",
        img_url: "wardrobe/pantofi/pantofi4.jpg",
        marimi_disponibile: ["35", "36", "37", "38", "39", "40", "41", "42"],
        sezon: Sezon.PRIMAVARA_TOAMNA,
        stil_general: [Stil.ELEGANT, Stil.CHIC],
        ocazie: ['party', 'date'],
        detalii: { tip_pantof: "Pantofi cu toc", inchidere: ["baretă la spate cu detaliu elastic"], material: "Piele" }
    },
    {
        cod_articol: "2562/610/800",
        model: "BALERINI DIN PIELE CU APLICAȚII",
        pret_ron: 199.90,
        culoare: "Negru",
        img_url: "wardrobe/pantofi/pantofi5.jpg",
        marimi_disponibile: ["35", "36", "37", "38", "39", "40", "41", "42"],
        sezon: Sezon.PRIMAVARA_TOAMNA,
        stil_general: [Stil.CASUAL, Stil.ELEGANT],
        ocazie: ['daily', 'party'],
        detalii: { tip_pantof: "Balerini", inchidere: [], material: "Piele" }
    },
    {
        cod_articol: "2257/710/183",
        model: "PANTOFI CU TOC ȘI DECUPAJE",
        pret_ron: 149.90,
        culoare: "pământiu",
        img_url: "wardrobe/pantofi/pantofi6.jpg",
        marimi_disponibile: ["35", "36", "37", "38", "39", "40", "41", "42"],
        sezon: Sezon.VARA,
        stil_general: [Stil.ELEGANT],
        ocazie: ['party', 'date'],
        detalii: { tip_pantof: "Pantofi cu toc", inchidere: ["cataramă metalică"], material: "Sintetic/Piele" }
    },
    {
        cod_articol: "2257/710/183-D",
        model: "PANTOFI CU TOC ȘI DECUPAJE (D)",
        pret_ron: 149.90,
        culoare: "pământiu",
        img_url: "wardrobe/pantofi/pantofi7.jpg",
        marimi_disponibile: ["35", "36", "37", "38", "39", "40", "41", "42"],
        sezon: Sezon.VARA,
        stil_general: [Stil.ELEGANT],
        ocazie: ['party'],
        detalii: { tip_pantof: "Pantofi cu toc", inchidere: ["cataramă metalică"], material: "Standard" }
    },
    {
        cod_articol: "2514/710/700",
        model: "SABOȚI DIN PIELE CU ȚINTE",
        pret_ron: 229.90,
        culoare: "Maro",
        img_url: "wardrobe/pantofi/pantofi8.jpg",
        marimi_disponibile: ["35", "36", "37", "38", "39", "40", "41", "42"],
        sezon: Sezon.VARA,
        stil_general: [Stil.BOHO, Stil.CASUAL],
        ocazie: ['daily', 'holiday'],
        detalii: { tip_pantof: "Saboți", inchidere: [], material: "Piele" }
    },
    {
        cod_articol: "12226710700",
        model: "PANTOFI CU TOC ȘI BARETĂ LA SPATE",
        pret_ron: null,
        culoare: "Argintiu",
        img_url: "wardrobe/pantofi/pantofi9.jpg",
        marimi_disponibile: [],
        sezon: Sezon.VARA,
        stil_general: [Stil.ELEGANT, Stil.GLAM],
        ocazie: ['party', 'wedding'],
        detalii: { tip_pantof: "Pantofi cu toc", inchidere: ["baretă la spate"], material: "Metalizat" }
    },
    {
        cod_articol: "1550/710/002",
        model: "BALERINI DIN PIELE CU FUNDĂ (LIMITED)",
        pret_ron: 319.90,
        culoare: "Alb-ecru",
        img_url: "wardrobe/pantofi/pantofi10.jpg",
        marimi_disponibile: ["36", "37", "38", "39", "40", "41"],
        sezon: Sezon.PRIMAVARA_TOAMNA,
        stil_general: [Stil.CHIC, Stil.ELEGANT],
        ocazie: ['daily', 'office'],
        detalii: { tip_pantof: "Balerini", inchidere: [], material: "Piele" }
    }
];