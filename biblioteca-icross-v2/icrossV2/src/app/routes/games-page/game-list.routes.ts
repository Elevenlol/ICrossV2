import { Routes } from '@angular/router';
import { GameDetailPageComponent } from './pages/game-detail-page/game-detail-page.component';
import { GameIdResolver } from '../../core/resolvers/game-id.resolver';
import { NewGamesPageComponent } from './pages/new-games-page/new-games-page.component';
import { GamesPageComponent } from './pages/game-page/games-page.component';

export const gameListRoutes: Routes = [
  {
    path: '',
    component: NewGamesPageComponent,
  },
  {
    path: 'games',
    component: GamesPageComponent,
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
  },
];
