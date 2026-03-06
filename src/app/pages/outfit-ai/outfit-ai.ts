import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/wardrobe';

@Component({
  selector: 'app-outfit-ai',
  imports: [CommonModule, RouterLink],
  templateUrl: './outfit-ai.html',
  styleUrl: './outfit-ai.css',
})
export class OutfitAi {
  isGenerating = false;
  outfitGenerated = false;

  // Aici vom salva ținuta generată
  generatedOutfit: {
    top: ClothingItem | null;
    bottom: ClothingItem | null;
    outerwear: ClothingItem | null;
    shoes: ClothingItem | null;
  } | null = null;

  constructor(private wardrobeService: WardrobeService) {}

  generateOutfit() {
    this.isGenerating = true;
    this.outfitGenerated = false;

    setTimeout(() => {
      // Magia AI-ului: ia random din fiecare categorie din baza ta de date!
      this.generatedOutfit = {
        outerwear: this.wardrobeService.getRandomItem('Outerwear'),
        top: this.wardrobeService.getRandomItem('Tops'),
        bottom: this.wardrobeService.getRandomItem('Bottoms'),
        shoes: this.wardrobeService.getRandomItem('Shoes')
      };

      this.isGenerating = false;
      this.outfitGenerated = true;
    }, 1500);
  }
}