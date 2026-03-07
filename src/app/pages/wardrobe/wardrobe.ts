import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/wardrobe';
@Component({
  selector: 'app-wardrobe',
  imports: [CommonModule],
  templateUrl: './wardrobe.html',
  styleUrl: './wardrobe.css',
})
export class Wardrobe implements OnInit {

  categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories', 'Pantalon'];
  activeCategory = 'All';

  clothingItems: any[] = [];

  constructor(private wardrobeService: WardrobeService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    const allItems = this.wardrobeService.getAllItems();

    if (this.activeCategory === 'All') {
      this.clothingItems = allItems;
    } else {    
    this.clothingItems = (allItems as any[]).filter(item => item.category === this.activeCategory);     }
  }

  setActiveCategory(category: string) {
    this.activeCategory = category;
    this.loadItems();
  }

}