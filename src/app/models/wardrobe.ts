// src/app/models/wardrobe.ts ← versiunea finală completă

import { Stil } from "./style.enum";
import { Sezon } from "./sezon.enum";
import { Mood } from "./mood.enum";
import { Vreme } from "./weather.enum";
import { Eveniment } from "./events.enum";
import { Fit } from "./fit.enum";


export interface ClothingItem {
    cod_articol:        string;
    model:              string;
    pret_ron:           number | null;
    culoare:            string;
    img_url:            string;
    image?:             string;  // ← adăugat înapoi pentru compatibilitate cu template-ul vechi
    marimi_disponibile: string[];
    stil_general:       Stil[];
    ocazie:             Eveniment[];
    sezon:              Sezon[];
    mood:               Mood[];
    vreme:              Vreme[];
    fit:                Fit;
}
export interface Pantalon extends ClothingItem {
    detalii: {
        tip_talie: 'Joasă' | 'Medie' | 'Înaltă';
        croiala:   string;
        inchidere: string[];
    };
}

export interface Pantof extends ClothingItem {
    detalii: {
        tip_pantof: string;
        inchidere:  string[];
        material:   string;
    };
}

export interface Sacou extends ClothingItem {
    detalii: {
        inchidere: string[];
        buzunare:  number;
        extra?:    string;
    };
}

export interface Top extends ClothingItem {
    detalii: {
        stil:       string;
        inchidere:  string[];
        tip_maneca: string;
    };
}

export interface Tricou extends ClothingItem {
    detalii: {
        material:   string;
        croiala:    string;
        tip_maneca: string;
    };
}

export interface Bluza extends ClothingItem {
    detalii: {
        stil:       string;
        tip_guler:  string;
        material:   string;
        tip_maneca: string;
    };
}

export interface Rochie extends ClothingItem {
    lungime: 'Scurtă' | 'Midi' | 'Lungă';
    detalii: {
        tip_talie:  string;
        inchidere:  string[];
        stil:       string;
    };
}

export interface Parfum {
    cod:       string;
    nume:      string;
    colectie:  string;
    pret:      number;
    moneda:    string;
    gramaj:    string;
    note?:     string[];
}