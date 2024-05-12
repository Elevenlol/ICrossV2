import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { gameListRoutes } from './routes/games-page/game-list.routes';



export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./routes/games-page/game-list.routes').then(
                (r) => r.gameListRoutes
              ),
          },
/*           {
            path: 'user',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('./routes/user/user.routes').then((r) => r.USER_ROUTES),
          }, */
        ],
      },
];
