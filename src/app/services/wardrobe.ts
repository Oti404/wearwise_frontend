import { Injectable } from '@angular/core';

import { PANTALONI_DATA } from '../data/pantaloni';
import { PANTOFI_DATA } from '../data/pantofi';
import { ROCHII_DATA } from '../data/rochie';
import { TRICOURI_DATA } from '../data/tricouri';
import { TOPURI_DATA } from '../data/top';
import { SACOURI_DATA } from '../data/sacou';
import { PARFUMURI_DATA } from '../data/parfum';
import { BLUZE_DATA } from '../data/bluza';

import { ClothingItem } from '../models/wardrobe';
import { Sezon } from '../models/sezon.enum';
import { Mood } from '../models/mood.enum';
import { Vreme } from '../models/weather.enum';
import { Eveniment } from '../models/events.enum';
import { Stil } from '../models/style.enum';
import { Fit, FitPreference, FIT_COMPATIBILITY } from '../models/fit.enum';

export interface OutfitFilters {
  sezon:     Sezon;
  mood:      Mood;
  vreme:     Vreme;
  eveniment: Eveniment;
  stil:      Stil;
  fit:       FitPreference;
}

export interface ScoredItem<T> {
  item:  T;
  score: number;
}

@Injectable({ providedIn: 'root' })
export class WardrobeService {

  // ── Getters simpli ────────────────────────────────────────────────────────
  getPantaloni() { return PANTALONI_DATA; }
  getPantofi()   { return PANTOFI_DATA;   }
  getRochii()    { return ROCHII_DATA;    }
  getTricouri()  { return TRICOURI_DATA;  }
  getTopuri()    { return TOPURI_DATA;    }
  getSacouri()   { return SACOURI_DATA;   }
  getParfumuri() { return PARFUMURI_DATA; }
  getBluze()     { return BLUZE_DATA;     }

  // ── Toate topurile (tricouri + topuri + bluze) ───────────────────────────
  getAllTops(): ClothingItem[] {
  return [
    ...TRICOURI_DATA,
    ...TOPURI_DATA,
    ...BLUZE_DATA,
  ].map(i => ({ ...i, image: i.img_url })) as ClothingItem[];
}

  // ── getAllItems pentru wardrobe view ──────────────────────────────────────
  getAllItems() {
    return [
      ...PANTALONI_DATA.map(i => ({ ...i, category: 'Bottoms' })),
      ...PANTOFI_DATA.map(i =>   ({ ...i, category: 'Shoes'   })),
      ...ROCHII_DATA.map(i =>    ({ ...i, category: 'Dresses' })),
      ...TRICOURI_DATA.map(i =>  ({ ...i, category: 'Tops'    })),
      ...TOPURI_DATA.map(i =>    ({ ...i, category: 'Tops'    })),
      ...BLUZE_DATA.map(i =>     ({ ...i, category: 'Tops'    })),
      ...SACOURI_DATA.map(i =>   ({ ...i, category: 'Outerwear' })),
    ];
  }

  // ── SCORING ───────────────────────────────────────────────────────────────
  /**
   * Calculează scorul unui item față de filtrele active.
   * Maxim teoretic: 120 pts (fără bonus cromatic).
   *
   *  Stil      25 pts
   *  Ocazie    25 pts
   *  Mood      20 pts  ← direct din câmpul item.mood[]
   *  Sezon     15 pts
   *  Vreme     15 pts  ← direct din câmpul item.vreme[]
   *  Fit       10 pts  ← FIT_COMPATIBILITY[filterFit].includes(item.fit)
   *  Culoare   10 pts  ← bonus dacă e neutru / complementar cu partenerul
   */
  scoreItem(
    item: ClothingItem,
    filters: OutfitFilters,
    partener?: ClothingItem
  ): number {
    let score = 0;

    if (item.stil_general?.includes(filters.stil))           score += 25;
    if (item.ocazie?.includes(filters.eveniment))            score += 25;
    if (item.mood?.includes(filters.mood))                   score += 20;

    if (item.sezon?.includes(filters.sezon))                 score += 15;
    else if (item.sezon?.includes(Sezon.ALL_SEASON))         score += 8;

    if (item.vreme?.includes(filters.vreme))                 score += 15;

    const compatibleFits = FIT_COMPATIBILITY[filters.fit] ?? [];
    if (compatibleFits.includes(item.fit as Fit))            score += 10;

    if (partener) score += this.scoreColorHarmony(item, partener);

    return score;
  }

  // ── SELECȚIE PONDERATĂ ────────────────────────────────────────────────────
  /**
   * Alege un item random dar ponderat — scorurile mai mari = șanse mai mari.
   * Fallback progresiv: dacă niciun item nu trece minScore, luăm toate itemele.
   */
  weightedPick<T extends ClothingItem>(
    items: T[],
    filters: OutfitFilters,
    partener?: ClothingItem,
    minScore = 20
  ): T {
    const scored = items
      .map(item => ({ item, score: this.scoreItem(item, filters, partener) }))
      .filter(({ score }) => score >= minScore)
      .sort((a, b) => b.score - a.score);

    const pool = scored.length > 0
      ? scored
      : items
          .map(item => ({ item, score: this.scoreItem(item, filters, partener) }))
          .sort((a, b) => b.score - a.score);

    const totalWeight = pool.reduce((sum, { score }) => sum + Math.max(score, 1), 0);
    let rand = Math.random() * totalWeight;

    for (const { item, score } of pool) {
      rand -= Math.max(score, 1);
      if (rand <= 0) return item;
    }

    return pool[0].item;
  }

  // ── ARMONIE CROMATICĂ ─────────────────────────────────────────────────────
  scoreColorHarmony(item: ClothingItem, partener: ClothingItem): number {
    const neutrals = ['negru', 'alb', 'gri', 'bej', 'crem', 'maro', 'navy', 'ecru', 'taupe'];
    const c1 = (item.culoare     || '').toLowerCase();
    const c2 = (partener.culoare || '').toLowerCase();

    if (!c1 || !c2)                              return 5;
    if (c1 === c2)                               return 3;
    if (neutrals.some(n => c1.includes(n)))      return 10;
    if (neutrals.some(n => c2.includes(n)))      return 10;
    if (this.areComplementary(c1, c2))           return 9;
    if (this.areAnalogous(c1, c2))               return 7;
    return 4;
  }

  private areComplementary(c1: string, c2: string): boolean {
    const pairs = [
      ['rosu', 'verde'], ['albastru', 'portocaliu'],
      ['galben', 'mov'], ['roz', 'olive']
    ];
    return pairs.some(([a, b]) =>
      (c1.includes(a) && c2.includes(b)) || (c1.includes(b) && c2.includes(a))
    );
  }

  private areAnalogous(c1: string, c2: string): boolean {
    const families = [
      ['rosu', 'roz', 'burgundy'],
      ['albastru', 'navy', 'turcoaz'],
      ['verde', 'olive', 'mint'],
      ['galben', 'portocaliu', 'mustar']
    ];
    return families.some(
      group => group.some(g => c1.includes(g)) && group.some(g => c2.includes(g))
    );
  }

  // ── RANDOM ITEM (pentru alte view-uri) ───────────────────────────────────
  getRandomItem(category: string): any {
    const map: Record<string, any[]> = {
      'Pantaloni': this.getPantaloni(),
      'Pantofi':   this.getPantofi(),
      'Rochii':    this.getRochii(),
      'Tricouri':  this.getTricouri(),
      'Topuri':    this.getTopuri(),
      'Sacouri':   this.getSacouri(),
      'Parfumuri': this.getParfumuri(),
      'Bluze':     this.getBluze(),
    };
    const items = map[category] ?? [];
    return items.length ? items[Math.floor(Math.random() * items.length)] : null;
  }

  addItem(item: any): void {
  console.log('Item adăugat:', item);
  // aici poți extinde logica ulterior (localStorage, API, etc.)
}
}