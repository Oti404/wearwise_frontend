import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { WardrobeService, OutfitFilters } from '../../services/wardrobe';
import { ClothingItem } from '../../models/wardrobe';

import { Sezon, SEZOANE_LISTA } from '../../models/sezon.enum';
import { Mood, MOODS_LISTA } from '../../models/mood.enum';
import { Stil, STILURI_LISTA } from '../../models/style.enum';
import { FitPreference, FIT_LISTA } from '../../models/fit.enum';
import { Vreme, VREME_LISTA } from '../../models/weather.enum';
import { Eveniment, EVENIMENTE_LISTA } from '../../models/events.enum';

@Component({
  selector: 'app-outfit-ai',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './outfit-ai.html',
  styleUrl: './outfit-ai.css',
})
export class OutfitAi {

  // ── Liste pentru dropdown-uri ────────────────────────────────────────────
  sezoaneDisponibile  = SEZOANE_LISTA;
  moodsDisponibile    = MOODS_LISTA;
  stiluriDisponibile  = STILURI_LISTA;
  fitDisponibile      = FIT_LISTA;
  vremeDisponibile    = VREME_LISTA;
  evenimenteDisponibile = EVENIMENTE_LISTA;

  // ── Filtre active ────────────────────────────────────────────────────────
  filterAnotimp:  Sezon         = Sezon.PRIMAVARA_TOAMNA;
  filterMood:     Mood          = Mood.MAIN_CHARACTER;
  filterStil:     Stil          = Stil.CASUAL;
  filterFit:      FitPreference = FitPreference.MIX_MATCH;
  filterVreme:    Vreme         = Vreme.CLOUDY;
  filterEveniment: Eveniment    = Eveniment.DAILY;

  // ── State ────────────────────────────────────────────────────────────────
  isGenerating   = false;
  generatedOutfit: {
  top:      ClothingItem;
  bottom:   ClothingItem;
  shoes:    ClothingItem;
  outerwear: ClothingItem | null;  // ← adăugat înapoi
} | null = null;

  constructor(
    private wardrobeService: WardrobeService,
    private cdr: ChangeDetectorRef
  ) {}

  generateOutfit(): void {
    this.isGenerating = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      const filters: OutfitFilters = {
        sezon:     this.filterAnotimp,
        mood:      this.filterMood,
        vreme:     this.filterVreme,
        eveniment: this.filterEveniment,
        stil:      this.filterStil,
        fit:       this.filterFit,
      };

      const tops      = this.wardrobeService.getAllTops() as ClothingItem[];
      const pantaloni = this.wardrobeService.getPantaloni();
      const pantofi   = this.wardrobeService.getPantofi();

      let top: ClothingItem, bottom: ClothingItem;

      if (this.filterFit === FitPreference.MIX_MATCH) {
        const c1Top    = this.wardrobeService.weightedPick(tops as any, filters);
        const c1Bottom = this.wardrobeService.weightedPick(pantaloni, filters, c1Top);
        const c2Top    = this.wardrobeService.weightedPick(tops as any, filters);
        const c2Bottom = this.wardrobeService.weightedPick(pantaloni, filters, c2Top);

        const score1 = this.wardrobeService.scoreItem(c1Top, filters)
                     + this.wardrobeService.scoreItem(c1Bottom, filters, c1Top);
        const score2 = this.wardrobeService.scoreItem(c2Top, filters)
                     + this.wardrobeService.scoreItem(c2Bottom, filters, c2Top);

        top    = score1 >= score2 ? c1Top    : c2Top;
        bottom = score1 >= score2 ? c1Bottom : c2Bottom;
      } else {
        top    = this.wardrobeService.weightedPick(tops as any, filters);
        bottom = this.wardrobeService.weightedPick(pantaloni, filters, top);
      }

      const shoes = this.wardrobeService.weightedPick(pantofi, filters, top);

      // Sacoul e opțional — îl adăugăm doar dacă scorul e suficient de mare
const sacouri = this.wardrobeService.getSacouri();
const bestSacou = this.wardrobeService.weightedPick(sacouri as any, filters, top);
const sacouScore = this.wardrobeService.scoreItem(bestSacou, filters, top);

this.generatedOutfit = {
  top,
  bottom,
  shoes,
  outerwear: sacouScore >= 40 ? bestSacou : null  // apare doar dacă se potrivește bine
};
      this.isGenerating = false;
      this.cdr.detectChanges();
    }, 1500);
  }


  get outfitGenerated(): boolean {
  return this.generatedOutfit !== null && !this.isGenerating;
}
}