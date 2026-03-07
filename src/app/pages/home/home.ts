import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WardrobeService } from '../../services/wardrobe';

// Importăm ABSOLUT TOATE enum-urile
import { Sezon, SEZOANE_LISTA } from '../../models/sezon.enum';
import { Mood, MOODS_LISTA } from '../../models/mood.enum';
import { Stil, STILURI_LISTA } from '../../models/style.enum';
import { FitPreference, FIT_LISTA } from '../../models/fit.enum';
import { Vreme, VREME_LISTA } from '../../models/weather.enum';
import { Eveniment, EVENIMENTE_LISTA } from '../../models/events.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  // ... (păstrează array-urile de haine: pantaloni, pantofi etc.)
  pantaloni: any[] = [];
  pantofi: any[] = [];
  rochii: any[] = [];
  tricouri: any[] = [];
  topuri: any[] = [];
  sacouri: any[] = [];
  parfumuri: any[] = [];

  // 1. Liste complete pentru HTML
  sezoaneDisponibile = SEZOANE_LISTA;
  moodsDisponibile = MOODS_LISTA;
  stiluriDisponibile = STILURI_LISTA;
  fitDisponibile = FIT_LISTA;
  vremeDisponibile = VREME_LISTA;
  evenimenteDisponibile = EVENIMENTE_LISTA;

  // 2. Variabilele legate de formular (Toate folosesc Enum-uri acum!)
  filterVreme: Vreme = Vreme.CLOUDY;
  filterAnotimp: Sezon = Sezon.PRIMAVARA_TOAMNA;
  filterMood: Mood = Mood.MAIN_CHARACTER;
  filterStil: Stil = Stil.CASUAL;
  filterFit: FitPreference = FitPreference.MIX_MATCH;
  filterEveniment: Eveniment = Eveniment.DAILY;

  isGenerating: boolean = false;
  generatedOutfit: any = null;

  constructor(private wardrobeService: WardrobeService) {}

  // ... (Păstrează ngOnInit și funcția generateOutfit exact cum le-am scris în mesajul anterior)
  // NOTĂ: Dacă ai funcția generateOutfit deja scrisă, ea va funcționa perfect cu aceste noi variabile!

  ngOnInit(): void {
    // Încărcăm toată garderoba
    this.pantaloni = this.wardrobeService.getPantaloni();
    this.pantofi = this.wardrobeService.getPantofi();
    this.rochii = this.wardrobeService.getRochii();
    this.tricouri = this.wardrobeService.getTricouri();
    this.topuri = this.wardrobeService.getTopuri();
    this.sacouri = this.wardrobeService.getSacouri();
    this.parfumuri = this.wardrobeService.getParfumuri();

    // Generăm un outfit default când utilizatorul intră prima dată pe pagină
    this.generateOutfit();
  }

  generateOutfit(): void {
  this.isGenerating = true;

  setTimeout(() => {
    const toateTopurile = [...this.topuri, ...this.tricouri];

    // ─── SISTEM DE SCORING ───────────────────────────────────────────────────

    /**
     * Calculează un scor de relevanță [0-100] pentru un item față de filtrele active.
     * Criteriile sunt ponderate: stilul și ocazia contează cel mai mult,
     * urmate de sezon, fit și compatibilitate cromatică.
     */
    const scoreItem = (item: any, context: { partener?: any } = {}): number => {
      let score = 0;

      // 1. STIL (25 pts) — item-ul se potrivește stilului selectat
      if (item.stil_general?.includes(this.filterStil)) score += 25;

      // 2. OCAZIE (25 pts) — item-ul e potrivit pentru evenimentul ales
      if (item.ocazie?.includes(this.filterEveniment)) score += 25;

      // 3. SEZON (20 pts) — item-ul e sezonier relevant
      if (item.sezon === this.filterAnotimp) score += 20;
      else if (item.sezon === Sezon.ALL_SEASON) score += 12;

      // 4. FIT PREFERENCE (20 pts) — potrivire cu preferința de croială
      const croiala = (
        item.croiala || item.detalii?.croiala || item.detalii?.stil || ''
      ).toLowerCase();

      const isOversized = ['oversize', 'larg', 'wide', 'balloon'].some(k => croiala.includes(k));
      const isFitted    = ['cambrat', 'mulat', 'strâmt', 'standard', 'dreaptă', 'regular', 'rib', 'corset']
                          .some(k => croiala.includes(k));

      if (this.filterFit === FitPreference.OVERSIZED && isOversized)   score += 20;
      else if (this.filterFit === FitPreference.FITTED && isFitted)    score += 20;
      else if (this.filterFit === FitPreference.MIX_MATCH)             score += 10; // ambele sunt ok
      else if (!isOversized && !isFitted)                              score += 5;  // croială neutră

      // 5. ARMONIE CROMATICĂ cu partenerul (10 pts)
      if (context.partener) {
        score += this.scoreColorHarmony(item, context.partener);
      }

      return score;
    };

    // ─── SELECȚIE PONDERATĂ ──────────────────────────────────────────────────

    /**
     * Alege un item folosind selecție ponderată pe baza scorurilor,
     * cu un fallback progresiv dacă niciun item nu trece pragul minim.
     */
    const weightedPick = <T>(items: T[], scorer: (item: T) => number, minScore = 20): T => {
      const scored = items
        .map(item => ({ item, score: scorer(item) }))
        .filter(({ score }) => score >= minScore)
        .sort((a, b) => b.score - a.score);

      // Fallback progresiv: relaxăm pragul până găsim ceva
      const pool = scored.length > 0
        ? scored
        : items.map(item => ({ item, score: scorer(item) })).sort((a, b) => b.score - a.score);

      // Selecție ponderată — scorurile mai mari = probabilitate mai mare
      const totalWeight = pool.reduce((sum, { score }) => sum + Math.max(score, 1), 0);
      let rand = Math.random() * totalWeight;

      for (const { item, score } of pool) {
        rand -= Math.max(score, 1);
        if (rand <= 0) return item;
      }

      return pool[0].item; // safety net
    };

    // ─── LOGICA MIX & MATCH ──────────────────────────────────────────────────

    /**
     * Pentru Mix & Match, inversăm intenționat fit-ul între top și bottom
     * (fitted top + oversized bottom sau invers) și favorizăm combinația
     * cu scorul total mai mare.
     */
    const pickMixMatch = () => {
      const combo1Top    = weightedPick(toateTopurile, i => scoreItem(i) + (this.isFitted(i) ? 15 : 0));
      const combo1Bottom = weightedPick(this.pantaloni, i => scoreItem(i, { partener: combo1Top }) + (this.isOversized(i) ? 15 : 0));

      const combo2Top    = weightedPick(toateTopurile, i => scoreItem(i) + (this.isOversized(i) ? 15 : 0));
      const combo2Bottom = weightedPick(this.pantaloni, i => scoreItem(i, { partener: combo2Top }) + (this.isFitted(i) ? 15 : 0));

      // Alegem combo-ul cu scorul total mai bun
      const score1 = scoreItem(combo1Top) + scoreItem(combo1Bottom, { partener: combo1Top });
      const score2 = scoreItem(combo2Top) + scoreItem(combo2Bottom, { partener: combo2Top });

      return score1 >= score2
        ? { top: combo1Top, bottom: combo1Bottom }
        : { top: combo2Top, bottom: combo2Bottom };
    };

    // ─── ASAMBLARE OUTFIT ────────────────────────────────────────────────────

    let top: any, bottom: any;

    if (this.filterFit === FitPreference.MIX_MATCH) {
      ({ top, bottom } = pickMixMatch());
    } else {
      top    = weightedPick(toateTopurile, i => scoreItem(i));
      bottom = weightedPick(this.pantaloni, i => scoreItem(i, { partener: top }));
    }

    // Pantofii sunt scorați ținând cont atât de ocazie cât și de stilul outfit-ului deja ales
    const shoes = weightedPick(
      this.pantofi,
      i => scoreItem(i, { partener: top }) + (i.ocazie?.includes(this.filterEveniment) ? 20 : 0)
    );

    this.generatedOutfit = { top, bottom, shoes };
    this.isGenerating = false;

  }, 1500);
}

// ─── HELPERS (adaugă în clasă) ──────────────────────────────────────────────

private isOversized(item: any): boolean {
  const c = (item.croiala || item.detalii?.croiala || item.detalii?.stil || '').toLowerCase();
  return ['oversize', 'larg', 'wide', 'balloon'].some(k => c.includes(k));
}

private isFitted(item: any): boolean {
  const c = (item.croiala || item.detalii?.croiala || item.detalii?.stil || '').toLowerCase();
  return ['cambrat', 'mulat', 'strâmt', 'standard', 'dreaptă', 'regular', 'rib', 'corset'].some(k => c.includes(k));
}

/**
 * Scor de armonie cromatică între două piese [0-10].
 * Folosește paleta de culori neutrale și complementare.
 */
private scoreColorHarmony(item: any, partener: any): number {
  const neutrals  = ['negru', 'alb', 'gri', 'bej', 'crem', 'maro', 'navy', 'black', 'white', 'beige'];
  const getColor  = (i: any) => (i.culoare || i.detalii?.culoare || '').toLowerCase();

  const c1 = getColor(item);
  const c2 = getColor(partener);

  if (!c1 || !c2) return 5; // date lipsă → scor neutru

  if (c1 === c2)                                           return 3;  // monochromatic, ok dar nu wow
  if (neutrals.some(n => c1.includes(n)))                 return 10; // neutral merge cu orice
  if (neutrals.some(n => c2.includes(n)))                 return 10;
  if (this.areComplementary(c1, c2))                      return 9;
  if (this.areAnalogous(c1, c2))                          return 7;

  return 4; // culori random — penalizare ușoară
}

private areComplementary(c1: string, c2: string): boolean {
  const pairs = [['rosu','verde'], ['albastru','portocaliu'], ['galben','mov'], ['roz','olive']];
  return pairs.some(([a, b]) => (c1.includes(a) && c2.includes(b)) || (c1.includes(b) && c2.includes(a)));
}

private areAnalogous(c1: string, c2: string): boolean {
  const families = [['rosu','roz','burgundy'], ['albastru','navy','turcoaz'], ['verde','olive','mint'], ['galben','portocaliu','mustar']];
  return families.some(group => group.some(g => c1.includes(g)) && group.some(g => c2.includes(g)));
}
}