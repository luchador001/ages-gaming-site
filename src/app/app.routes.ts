import { Routes } from '@angular/router';
import { Hero } from './components/hero/hero';
import { GamesPage } from './components/games-page/games-page';

export const routes: Routes = [
  { path: '', component: Hero },
  { path: 'games', component: GamesPage },
  { path: '**', redirectTo: '' },
];
