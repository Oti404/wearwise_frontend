import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Wardrobe} from './pages/wardrobe/wardrobe';
import { OutfitAi } from './pages/outfit-ai/outfit-ai';
import { Scanner} from './pages/scanner/scanner';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'wardrobe', component: Wardrobe },
  { path: 'outfit-ai', component: OutfitAi },
  { path: 'scanner', component: Scanner },
  { path: '**', redirectTo: 'home' }
];