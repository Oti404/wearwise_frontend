import { Injectable } from '@angular/core';

import { PANTALONI_DATA } from '../data/pantaloni';
import { PANTOFI_DATA } from '../data/pantofi';
import { ROCHII_DATA } from '../data/rochie';
import { TRICOURI_DATA } from '../data/tricouri';
import { TOPURI_DATA } from '../data/top';
import { SACOURI_DATA } from '../data/sacou';
import { PARFUMURI_DATA } from '../data/parfum';
import { ClothingItem } from '../models/wardrobe';

@Injectable({
  providedIn: 'root'
})

export class WardrobeService {

  getPantaloni() { return PANTALONI_DATA; }

  getPantofi() { return PANTOFI_DATA; }

  getRochii() { return ROCHII_DATA; }

  getTricouri() { return TRICOURI_DATA; }

  getTopuri() { return TOPURI_DATA; }

  getSacouri() { return SACOURI_DATA; }

  getParfumuri() { return PARFUMURI_DATA; }

  getAllItems() {
  return [
    ...PANTALONI_DATA.map(item => ({ ...item, category: 'Bottoms', image: item.img_url })),
    ...PANTOFI_DATA.map(item => ({ ...item, category: 'Shoes', image: item.img_url })),
    ...ROCHII_DATA.map(item => ({ ...item, category: 'Tops', image: item.img_url })),
    ...TRICOURI_DATA.map(item => ({ ...item, category: 'Tops', image: item.img_url })),
    ...TOPURI_DATA.map(item => ({ ...item, category: 'Tops', image: item.img_url })),
    ...SACOURI_DATA.map(item => ({ ...item, category: 'Outerwear', image: item.img_url }))
  ];
}

  getRandomItem(category: string): any {

    let items: any[] = [];

    switch (category) {
      case 'Pantaloni': items = this.getPantaloni(); break;
      case 'Pantofi': items = this.getPantofi(); break;
      case 'Rochii': items = this.getRochii(); break;
      case 'Tricouri': items = this.getTricouri(); break;
      case 'Topuri': items = this.getTopuri(); break;
      case 'Sacouri': items = this.getSacouri(); break;
      case 'Parfumuri': items = this.getParfumuri(); break;
    }

    if (items.length === 0) return null;

    return items[Math.floor(Math.random() * items.length)];
  }

  addItem(item: any) {
    console.log('Item adăugat:', item);
  }

}