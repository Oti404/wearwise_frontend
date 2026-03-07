import { Pantof } from '../models/wardrobe';
import { Sezon } from '../models/sezon.enum';
import { Stil } from '../models/style.enum';
import { Mood } from '../models/mood.enum';
import { Vreme } from '../models/weather.enum';
import { Eveniment } from '../models/events.enum';
import { Fit } from '../models/fit.enum';
/**
 * Configurații reutilizabile pentru a evita repetarea datelor
 */
const GRILA_STANDARD = ["35", "36", "37", "38", "39", "40", "41", "42"];
const GRILA_BARBATI = ["40", "41", "42", "43", "44", "45"];
const VREME_OPTIMA = [Vreme.CLOUDY, Vreme.SUNNY];

export const PANTOFI_DATA: Pantof[] = [
    {
        cod_articol: "1283/710/102",
        model: "PANTOFI ASIMETRICI CU TOC DIN CATIFEA",
        pret_ron: 199.90,
        culoare: "Bej",
        img_url: "wardrobe/pantofi/pantofi1.jpg",
        marimi_disponibile: GRILA_STANDARD,
        sezon: [Sezon.PRIMAVARA_TOAMNA],
        stil_general: [Stil.ELEGANT, Stil.PARTY],
        ocazie: [Eveniment.WEDDING, Eveniment.EVENING, Eveniment.PARTY],
        mood: [Mood.CONFIDENT, Mood.MAIN_CHARACTER, Mood.ROMANTIC],
        vreme: VREME_OPTIMA,
        fit: Fit.FITTED,
        detalii: { tip_pantof: "Pantofi cu toc", inchidere: ["cataramă reglabilă"], material: "Catifea" }
    },
    {
        cod_articol: "1212/710/105",
        model: "PANTOFI FĂRĂ TOC CU BARETĂ LA SPATE",
        pret_ron: 199.90,
        culoare: "Maro",
        img_url: "wardrobe/pantofi/pantofi2.jpg",
        marimi_disponibile: GRILA_STANDARD,
        sezon: [Sezon.PRIMAVARA_TOAMNA],
        stil_general: [Stil.OFFICE, Stil.CASUAL],
        ocazie: [Eveniment.BUSINESS, Eveniment.OFFICE, Eveniment.DAILY],
        mood: [Mood.PRODUCTIVE, Mood.CONFIDENT, Mood.MINIMALIST],
        vreme: VREME_OPTIMA,
        fit: Fit.REGULAR,
        detalii: { tip_pantof: "Pantofi fara toc", inchidere: ["baretă la spate"], material: "Piele întoarsă" }
    },
    {
        cod_articol: "2537/610/116",
        model: "BALERINI DIN PIELE ÎNTOARSĂ",
        pret_ron: 199.90,
        culoare: "Maro-ciocolatiu",
        img_url: "wardrobe/pantofi/pantofi3.jpg",
        marimi_disponibile: GRILA_STANDARD,
        sezon: [Sezon.PRIMAVARA_TOAMNA, Sezon.ALL_SEASON],
        stil_general: [Stil.CASUAL, Stil.OFFICE],
        ocazie: [Eveniment.DAILY, Eveniment.BUSINESS, Eveniment.BRUNCH],
        mood: [Mood.CHILL, Mood.PRODUCTIVE, Mood.VINTAGE],
        vreme: VREME_OPTIMA,
        fit: Fit.REGULAR,
        detalii: { tip_pantof: "Balerini", inchidere: ["cataramă"], material: "Piele întoarsă" }
    },
    {
        cod_articol: "2242/710/600",
        model: "PANTOFI DIN PIELE CU TOC ȘI BARETĂ LA SPATE",
        pret_ron: 199.90,
        culoare: "Roșu",
        img_url: "wardrobe/pantofi/pantofi4.jpg",
        marimi_disponibile: GRILA_STANDARD,
        sezon: [Sezon.PRIMAVARA_TOAMNA, Sezon.ALL_SEASON],
        stil_general: [Stil.ELEGANT, Stil.CHIC],
        ocazie: [Eveniment.PARTY, Eveniment.DATE, Eveniment.EVENING],
        mood: [Mood.BOLD, Mood.CONFIDENT, Mood.ROMANTIC],
        vreme: VREME_OPTIMA,
        fit: Fit.FITTED,
        detalii: { tip_pantof: "Pantofi cu toc", inchidere: ["baretă elastică"], material: "Piele" }
    },
    {
        cod_articol: "2562/610/800",
        model: "BALERINI DIN PIELE CU APLICAȚII",
        pret_ron: 199.90,
        culoare: "Negru",
        img_url: "wardrobe/pantofi/pantofi5.jpg",
        marimi_disponibile: GRILA_STANDARD,
        sezon: [Sezon.PRIMAVARA_TOAMNA, Sezon.ALL_SEASON],
        stil_general: [Stil.CASUAL, Stil.ELEGANT],
        ocazie: [Eveniment.DAILY, Eveniment.PARTY, Eveniment.OFFICE],
        mood: [Mood.CHILL, Mood.CONFIDENT, Mood.TRENDY],
        vreme: VREME_OPTIMA,
        fit: Fit.REGULAR,
        detalii: { tip_pantof: "Balerini", inchidere: [], material: "Piele" }
    },
    {
        cod_articol: "2257/710/183",
        model: "PANTOFI CU TOC ȘI DECUPAJE",
        pret_ron: 149.90,
        culoare: "Pământiu",
        img_url: "wardrobe/pantofi/pantofi6.jpg",
        marimi_disponibile: GRILA_STANDARD,
        sezon: [Sezon.VARA, Sezon.PRIMAVARA_VARA],
        stil_general: [Stil.ELEGANT],
        ocazie: [Eveniment.PARTY, Eveniment.DATE, Eveniment.EVENING],
        mood: [Mood.BOLD, Mood.ROMANTIC, Mood.MYSTERIOUS],
        vreme: [Vreme.SUNNY],
        fit: Fit.FITTED,
        detalii: { tip_pantof: "Pantofi cu toc", inchidere: ["cataramă metalică"], material: "Sintetic/Piele" }
    },
    {
        cod_articol: "2514/710/700",
        model: "SABOȚI DIN PIELE CU ȚINTE",
        pret_ron: 229.90,
        culoare: "Maro",
        img_url: "wardrobe/pantofi/pantofi8.jpg",
        marimi_disponibile: GRILA_STANDARD,
        sezon: [Sezon.VARA, Sezon.PRIMAVARA_VARA],
        stil_general: [Stil.BOHO, Stil.CASUAL],
        ocazie: [Eveniment.DAILY, Eveniment.HOLIDAY, Eveniment.BEACH],
        mood: [Mood.CHILL, Mood.VINTAGE, Mood.ENERGETIC],
        vreme: [Vreme.SUNNY],
        fit: Fit.REGULAR,
        detalii: { tip_pantof: "Saboți", inchidere: [], material: "Piele" }
    },
    {
        cod_articol: "12226710700",
        model: "PANTOFI CU TOC ȘI BARETĂ LA SPATE",
        pret_ron: null,
        culoare: "Argintiu",
        img_url: "wardrobe/pantofi/pantofi9.jpg",
        marimi_disponibile: [],
        sezon: [Sezon.VARA, Sezon.ALL_SEASON],
        stil_general: [Stil.ELEGANT, Stil.GLAM],
        ocazie: [Eveniment.PARTY, Eveniment.WEDDING, Eveniment.EVENING],
        mood: [Mood.BOLD, Mood.PARTY, Mood.MAIN_CHARACTER],
        vreme: VREME_OPTIMA,
        fit: Fit.FITTED,
        detalii: { tip_pantof: "Pantofi cu toc", inchidere: ["baretă"], material: "Metalizat" }
    },
    {
        cod_articol: "1550/710/002",
        model: "BALERINI DIN PIELE CU FUNDĂ (LIMITED)",
        pret_ron: 319.90,
        culoare: "Alb-ecru",
        img_url: "wardrobe/pantofi/pantofi10.jpg",
        marimi_disponibile: ["36", "37", "38", "39", "40", "41"],
        sezon: [Sezon.PRIMAVARA_TOAMNA, Sezon.ALL_SEASON],
        stil_general: [Stil.CHIC, Stil.ELEGANT],
        ocazie: [Eveniment.DAILY, Eveniment.OFFICE, Eveniment.DATE],
        mood: [Mood.ROMANTIC, Mood.TRENDY, Mood.MINIMALIST],
        vreme: VREME_OPTIMA,
        fit: Fit.REGULAR,
        detalii: { tip_pantof: "Balerini", inchidere: [], material: "Piele" }
    },
    {
        cod_articol: "LR-1885-CH",
        model: "GHETE CHELSEA LUDWIG REITER",
        pret_ron: 2850.00,
        culoare: "Negru",
        img_url: "wardrobe/pantofi/pantofi11.jpg",
        marimi_disponibile: GRILA_BARBATI,
        sezon: [Sezon.PRIMAVARA_TOAMNA, Sezon.IARNA],
        stil_general: [Stil.ELEGANT, Stil.OFFICE, Stil.CLASSIC],
        ocazie: [Eveniment.BUSINESS, Eveniment.OFFICE, Eveniment.DAILY],
        mood: [Mood.CONFIDENT, Mood.MINIMALIST, Mood.PRODUCTIVE],
        vreme: [Vreme.CLOUDY, Vreme.RAINY, Vreme.SUNNY],
        fit: Fit.REGULAR,
        detalii: { tip_pantof: "Ghete Chelsea", inchidere: ["Inserții elastice"], material: "Piele de vițel" }
    },
    {
        cod_articol: "LV-TMB-6IN-OR",
        model: "GHETE 6-INCH LV X TIMBERLAND",
        pret_ron: 14500.00,
        culoare: "Portocaliu",
        img_url: "wardrobe/pantofi/pantofi12.jpg",
        marimi_disponibile: GRILA_BARBATI,
        sezon: [Sezon.IARNA, Sezon.PRIMAVARA_TOAMNA],
        stil_general: [Stil.STREETWEAR, Stil.GLAM],
        ocazie: [Eveniment.DAILY, Eveniment.PARTY],
        mood: [Mood.BOLD, Mood.MAIN_CHARACTER, Mood.TRENDY],
        vreme: [Vreme.SNOWY, Vreme.RAINY, Vreme.CLOUDY],
        fit: Fit.OVERSIZED, // Corectat din OVERSIZE
        detalii: { tip_pantof: "Ghete", inchidere: ["șireturi"], material: "Piele Nubuck LV" }
    },
    {
        cod_articol: "3542/710/102",
        model: "MOCASINI DIN PIELE ÎNTOARSĂ",
        pret_ron: 259.90,
        culoare: "Bej",
        img_url: "wardrobe/pantofi/pantofi13.jpg",
        marimi_disponibile: ["39", "40", "41", "42", "43", "44"],
        sezon: [Sezon.PRIMAVARA_TOAMNA, Sezon.VARA],
        stil_general: [Stil.CASUAL, Stil.OFFICE],
        ocazie: [Eveniment.DAILY, Eveniment.BUSINESS, Eveniment.BRUNCH],
        mood: [Mood.CHILL, Mood.PRODUCTIVE, Mood.MINIMALIST],
        vreme: VREME_OPTIMA,
        fit: Fit.REGULAR,
        detalii: { tip_pantof: "Mocasini", inchidere: ["slip-on"], material: "Piele întoarsă" }
    },
    {
        cod_articol: "3141/014/105",
        model: "SNEAKERS NIKE DUNK LOW",
        pret_ron: 649.90,
        culoare: "Maro/Gri/Alb",
        img_url: "wardrobe/pantofi/pantofi14.jpg",
        marimi_disponibile: ["38", "39", "40", "41", "42", "43", "44"],
        sezon: [Sezon.PRIMAVARA_TOAMNA, Sezon.ALL_SEASON],
        stil_general: [Stil.CASUAL, Stil.STREETWEAR],
        ocazie: [Eveniment.DAILY, Eveniment.CASUAL_OUTING],
        mood: [Mood.CHILL, Mood.TRENDY, Mood.CONFIDENT],
        vreme: VREME_OPTIMA,
        fit: Fit.REGULAR,
        detalii: { tip_pantof: "Sneakers", inchidere: ["șireturi"], material: "Piele" }
    },
    {
        cod_articol: "3512/810/040",
        model: "SNEAKERS MINIMALIȘTI",
        pret_ron: 159.90,
        culoare: "Negru",
        img_url: "wardrobe/pantofi/pantofi15.jpg",
        marimi_disponibile: GRILA_BARBATI,
        sezon: [Sezon.PRIMAVARA_TOAMNA, Sezon.ALL_SEASON],
        stil_general: [Stil.CASUAL],
        ocazie: [Eveniment.DAILY, Eveniment.OFFICE],
        mood: [Mood.MINIMALIST, Mood.CHILL],
        vreme: VREME_OPTIMA,
        fit: Fit.REGULAR,
        detalii: { tip_pantof: "Sneakers", inchidere: ["șireturi"], material: "Piele sintetică" }
    }
];