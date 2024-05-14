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
import { Observable, Subject } from 'rxjs';
import { CrudOperationsService } from '../../../../core/services/common/crud-operations.service';
import { Game } from '../../../../core/models/game';

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
export class FavoriteGamesComponente implements OnInit {
  constructor() {}
  crudOperator: CrudOperationsService = inject(CrudOperationsService);
  $games: WritableSignal<Game[]> = signal([]);
  params: PageParams = {
    title: 'Favorite Games',
    showFilters: false,
  };
  ngOnInit(): void {}


}
