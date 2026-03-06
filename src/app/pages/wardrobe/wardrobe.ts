import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WardrobeService, ClothingItem } from '../../services/wardrobe';

@Component({
  selector: 'app-wardrobe',
  imports: [CommonModule],
  templateUrl: './wardrobe.html',
  styleUrl: './wardrobe.css',
})
export class Wardrobe implements OnInit {
  categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories'];
  activeCategory = 'All';
  
  // Lăsăm array-ul gol la început. Datele reale vin din Serviciu!
  clothingItems: ClothingItem[] = [];

  constructor(private wardrobeService: WardrobeService) {}

  ngOnInit() {
    // Încărcăm datele din "baza de date" locală când se deschide pagina
    this.loadItems();
  }

  loadItems() {
    const allItems = this.wardrobeService.getAllItems();
    if (this.activeCategory === 'All') {
      this.clothingItems = allItems;
    } else {
      this.clothingItems = allItems.filter(item => item.category === this.activeCategory);
    }
  }

  setActiveCategory(category: string) {
    this.activeCategory = category;
    this.loadItems(); // Re-filtrăm lista când dăm click pe o categorie
  }
}