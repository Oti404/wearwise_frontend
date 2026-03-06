export interface ClothingItem {
    cod_articol: string;
    model: string;
    pret_ron: number | null;
    culoare: string;
    img_url: string;
    image?: string; // <-- adăugat pentru compatibilitate template
    marimi_disponibile: string[];
    stil_general?: string[];
    ocazie?: string[];
    sezon: 'Vară' | 'Iarnă' | 'Primăvară/Toamnă' | 'All Season';
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
    note?: string[]; // ex: ['lemnos', 'floral'] - util pentru AI
}