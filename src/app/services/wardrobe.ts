import { Injectable } from '@angular/core';

export interface ClothingItem {
  id: string;
  name: string;
  category: string; // 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories'
  brand: string;
  season: string;
  image: string; // URL sau Base64
}

@Injectable({
  providedIn: 'root'
})
export class WardrobeService {
  private dbKey = 'wearwise_db';
  private items: ClothingItem[] = [];

  constructor() {
    this.loadDb();
  }

  // Încarcă datele din localStorage sau pune date default
  private loadDb() {
    const saved = localStorage.getItem(this.dbKey);
    if (saved) {
      this.items = JSON.parse(saved);
    } else {
      // Date default (Mock data-ul nostru inițial)
      this.items = [
        { id: '1', name: 'Essential White Tee', category: 'Tops', brand: 'Everlane', season: 'Summer', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop' },
        { id: '2', name: 'Vintage Wash Denim', category: 'Bottoms', brand: "Levi's", season: 'All Season', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500&auto=format&fit=crop' },
        { id: '3', name: 'Classic Moto Jacket', category: 'Outerwear', brand: 'AllSaints', season: 'Fall/Winter', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500&auto=format&fit=crop' },
        { id: '4', name: 'Air Force 1', category: 'Shoes', brand: 'Nike', season: 'Spring/Summer', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=500&auto=format&fit=crop' },
        { id: '5', name: 'Oxford Button-Down', category: 'Tops', brand: 'Ralph Lauren', season: 'Workwear', image: 'https://images.unsplash.com/photo-1596755094514-f87e32f6b717?q=80&w=500&auto=format&fit=crop' },
        { id: '6', name: 'Navy Trousers', category: 'Bottoms', brand: 'Zara', season: 'Workwear', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=500&auto=format&fit=crop' }
      ];
      this.saveDb();
    }
  }

  private saveDb() {
    localStorage.setItem(this.dbKey, JSON.stringify(this.items));
  }

  // Returnează toate hainele pentru pagina Wardrobe
  getAllItems(): ClothingItem[] {
    return this.items;
  }

  // Adaugă o haină nouă (folosit de Scanner)
  addItem(item: ClothingItem) {
    this.items.unshift(item); // O punem prima în listă
    this.saveDb();
  }

  // Extrage o haină random dintr-o anumită categorie (folosit de Outfit AI)
  getRandomItem(category: string): ClothingItem | null {
    const filtered = this.items.filter(i => i.category === category);
    if (filtered.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
  }
}