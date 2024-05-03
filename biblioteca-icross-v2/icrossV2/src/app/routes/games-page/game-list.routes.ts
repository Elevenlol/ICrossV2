import { Routes } from '@angular/router';
import { GameDetailPageComponent } from './pages/game-detail-page/game-detail-page.component';
import { GameIdResolver } from '../../core/resolvers/game-id.resolver';

export const gameListRoutes: Routes = [
  {
    path: 'games',
    loadComponent: () =>
      import('./pages/game-page/games-page.component').then(
        (m) => m.GamesPageComponent
      ),
      
  },
  {
    path: 'games/:id',
    component: GameDetailPageComponent,
    resolve: {
      game: GameIdResolver,
    },
    data: {
      reuseComponent: false,
    },
  }
];
