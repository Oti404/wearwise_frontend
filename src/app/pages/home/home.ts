import { Component, OnInit } from '@angular/core';
import { WardrobeService } from '../../services/wardrobe';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class Home implements OnInit {

  pantaloni: any[] = [];
  pantofi: any[] = [];
  rochii: any[] = [];
  tricouri: any[] = [];
  topuri: any[] = [];
  sacouri: any[] = [];
  parfumuri: any[] = [];

  constructor(private wardrobeService: WardrobeService) {}

  ngOnInit(): void {

    this.pantaloni = this.wardrobeService.getPantaloni();
    this.pantofi = this.wardrobeService.getPantofi();
    this.rochii = this.wardrobeService.getRochii();
    this.tricouri = this.wardrobeService.getTricouri();
    this.topuri = this.wardrobeService.getTopuri();
    this.sacouri = this.wardrobeService.getSacouri();
    this.parfumuri = this.wardrobeService.getParfumuri();

  }

}