//src/app/models/wardrobe.ts
// ==========================================
// INTERFEȚE GARDEROBĂ
// ==========================================

import { Stil } from "./style.enum";
import { Sezon } from "./sezon.enum";



export interface ClothingItem {
    cod_articol: string;
    model: string;
    pret_ron: number | null;
    culoare: string;
    img_url: string;
    image?: string; 
    marimi_disponibile: string[];
    
    // Câmpuri AI actualizate strict cu Enums
    stil_general?: Stil[]; 
    ocazie?: string[]; // Poate fi transformat în Enum ulterior dacă dorești
    sezon: Sezon; 
}

export interface Pantalon extends ClothingItem {
    detalii: {
        tip_talie: 'Joasă' | 'Medie' | 'Înaltă';
        croiala: string;
        inchidere: string[];
    };
}

export interface Pantof extends ClothingItem {
    detalii: {
        tip_pantof: string;
        inchidere: string[];
        material: string;
    };
}

export interface Sacou extends ClothingItem {
    croiala: 'Standard' | 'Cambrat' | 'Oversize';
    detalii: {
        inchidere: string[];
        buzunare: number;
        extra?: string;
    };
}

export interface Top extends ClothingItem {
    detalii: {
        stil: string;
        inchidere: string[];
        tip_maneca: string;
    };
}

export interface Tricou extends ClothingItem {
    detalii: {
        material: string;
        croiala: string;
        tip_maneca: string;
    };
}

export interface Bluza extends ClothingItem {
    detalii: {
        stil: string;        
        tip_guler: string;    
        material: string;     
        tip_maneca: string;   
    };
}

export interface Rochie extends ClothingItem {
    lungime: 'Scurtă' | 'Midi' | 'Lungă';
    detalii: {
        tip_talie: string;
        inchidere: string[];
        stil: string;
    };
}

export interface Parfum {
    cod: string;
    nume: string;
    colectie: string;
    pret: number;
    moneda: string;
    gramaj: string;
    note?: string[]; 
}