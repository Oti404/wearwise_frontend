import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/wardrobe';
@Component({
  selector: 'app-scanner',
  imports: [RouterLink, CommonModule],
  templateUrl: './scanner.html',
  styleUrl: './scanner.css',
})
export class Scanner implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  stream: MediaStream | null = null;
  photoTaken = false;
  photoUrl: string | null = null;

  // Injectăm Router-ul pentru a putea naviga programatic
constructor(private router: Router, private wardrobeService: WardrobeService) {}

  ngOnInit() {
    this.startCamera();
  }

  ngOnDestroy() {
    this.stopCamera();
  }

  async startCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setTimeout(() => {
        if (this.videoElement) {
          this.videoElement.nativeElement.srcObject = this.stream;
        }
      }, 100);
    } catch (err) {
      console.error("Eroare la accesarea camerei:", err);
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }

  takePhoto() {
    if (this.videoElement && this.canvasElement) {
      const video = this.videoElement.nativeElement;
      const canvas = this.canvasElement.nativeElement;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        this.photoUrl = canvas.toDataURL('image/jpeg');
        this.photoTaken = true;
        this.stopCamera();
      }
    }
  }

  retakePhoto() {
    this.photoTaken = false;
    this.photoUrl = null;
    this.startCamera();
  }

  // NOUA FUNCȚIE PENTRU SALVARE
  // NOUA FUNCȚIE PENTRU SALVARE ÎN DB LOCAL
  saveAndAdd() {
    if (!this.photoUrl) return;

    // 1. Creăm obiectul haină cu poza făcută de tine (Base64)
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'My Scanned Item',
      category: 'Tops', // Poți schimba în funcție de ce scanezi
      brand: 'WearWise',
      season: 'All Season',
      image: this.photoUrl 
    };

    // 2. Adăugăm în "Baza de date" (LocalStorage) prin serviciu
    this.wardrobeService.addItem(newItem);

    // 3. (Opțional) Dacă vrei SĂ SE ȘI DESCARCE în PC, lăsăm și codul tău vechi:
    const timestamp = new Date().getTime();
    const fileName = `tshirt_man_${timestamp}.jpg`;
    const link = document.createElement('a');
    link.href = this.photoUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 4. Te trimitem direct în secțiunea Garderobă să îți vezi noua haină!
    this.router.navigate(['/wardrobe']);
  }
}