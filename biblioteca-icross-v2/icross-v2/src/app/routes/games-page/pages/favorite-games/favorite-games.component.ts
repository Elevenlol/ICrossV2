import {
  Component,
  OnInit,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { PageParams } from '../../../../core/models/page-params';
import { GameListComponent } from '../../../../shared/game-list/game-list.component';
import { SpinnerComponent } from '../../../../shared/spinner/spinner.component';
import { NgTemplateOutlet } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { CrudOperationsService } from '../../../../core/services/common/crud-operations.service';
import { Game, SearchResult } from '../../../../core/models/game';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';

@Component({
  selector: 'app-favorite-games',
  standalone: true,
  imports: [
    GameListComponent,
    SpinnerComponent,
    NgTemplateOutlet,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  templateUrl: './favorite-games.component.html',
  styleUrl: './favorite-games.component.scss',
})
export class FavoriteGamesComponente {
  crudOperator: CrudOperationsService = inject(CrudOperationsService);
  private gamesSubscription: Subscription;
  protected readonly destroy$: AutoDestroyService = inject(AutoDestroyService);
  $games: WritableSignal<Game[]> = signal([]);
  params: PageParams = {
    title: 'Favorite Games',
    showFilters: false,
  };
  constructor() {
    this.favoriteGames();
  }
  favoriteGames() {
    this.gamesSubscription = this.crudOperator
      .getGames()
      .subscribe((games: Game[]) => {
        this.$games.set(games);
      });
    console.log(this.$games);
  }
}
