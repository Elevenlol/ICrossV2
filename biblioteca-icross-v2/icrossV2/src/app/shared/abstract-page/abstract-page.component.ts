import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Signal,
  WritableSignal,
  inject,
} from '@angular/core';
import { GameSearchService } from '../../core/services/common/game-search.service';
import { AutoDestroyService } from '../../core/services/utils/auto-destroy.service';
import { Subject, merge, switchMap, take, takeUntil, tap } from 'rxjs';
import { Game, Genre } from '../../core/models/game';

import { SearchFilters } from '../../core/models/search-filters';
import { SpinnerComponent } from '../spinner/spinner.component';
import { GameListComponent } from '../game-list/game-list.component';
import { NgTemplateOutlet } from '@angular/common';
import { PageParams } from '../../core/models/page-params';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GenreService } from '../../routes/games-page/services/genre.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-abstract-games-page',
  standalone: true,
  imports: [
    GameListComponent,
    SpinnerComponent,
    NgTemplateOutlet,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  templateUrl: './abstract-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './abstract-page.component.scss',
})
export abstract class AbstractGamesPageComponent implements OnInit, OnDestroy {
  protected readonly gamesSearchService: GameSearchService =
    inject(GameSearchService);
  protected readonly genreService: GenreService = inject(GenreService);
  private readonly fb: FormBuilder = inject(FormBuilder);
  protected readonly destroy$: AutoDestroyService = inject(AutoDestroyService);
  $games: Signal<Game[]> = this.gamesSearchService.$games;
  $loading: Signal<boolean> = this.gamesSearchService.$loading;
  $genres: Signal<Genre[]> = this.genreService.$genres;

  onFiltersChange$: Subject<SearchFilters> = new Subject<SearchFilters>();
  orderPreference: string = 'Relevance';

  searchFilters: SearchFilters = {
    search: '',
    page_size: 50,
  };
  params: PageParams = {
    title: 'Indica un titulo',
    showFilters: true,
  };
  form: FormGroup;
  constructor() {}
  ngOnInit(): void {
    if (this.params.showFilters) {
      this.initForm();
    }
    this.getGenres();
    this.subscribeToFilterChanges();
    this.subscribeToQueryChanges();
  }
  initForm(): void {
    this.form = this.fb.group({
      order: ['-relevance'],
      genre: [''],
    });
    this.subscribeToFormChanges();
  }

  //suscripcion a cambios en filtros tanto input como controles
  subscribeToFilterChanges(): void {
    this.onFiltersChange$
      .pipe(
        switchMap((filters: SearchFilters) =>
          this.gamesSearchService.searchGames2(filters)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.gamesSearchService.setNextUrl(data.next);
        this.gamesSearchService.setGames(data.results);
      });
  }

  //suscripcion a los cambios del input buscador
  subscribeToQueryChanges(): void {
    this.gamesSearchService.queryString$
      .pipe(takeUntil(this.destroy$))
      .subscribe((query: string) => {
        this.onFiltersChange$.next({ ...this.searchFilters, search: query });
      });
  }

  //Subscripcion a los cambios del formulario
  subscribeToFormChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const ordering = this.form.controls['order'].value;
      const genres = this.form.controls['genre'].value;
      this.onFiltersChange$.next({ ...this.searchFilters, ordering, genres });
    });
  }
  getGenres(): void {
    this.genreService
      .getGenres()
      .pipe(takeUntil(this.destroy$))
      .subscribe((genres: Genre[]) => {
        this.genreService.setGenres(genres);
      });
  }

  onScroll(): void {
    this.onFiltersChange$.next(this.searchFilters);
  }
  ngOnDestroy(): void {
    this.gamesSearchService.setNextUrl('');
  }
}
