import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { GameSearchService } from '../../core/services/common/game-search.service';
import { AutoDestroyService } from '../../core/services/utils/auto-destroy.service';
import {
  BehaviorSubject,
  Subject,
  exhaustMap,
  merge,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { Game, Genre, SearchResult } from '../../core/models/game';

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
export abstract class AbstractGamesPageComponent implements OnInit {
  protected readonly gamesSearchService: GameSearchService =
    inject(GameSearchService);
  protected readonly genreService: GenreService = inject(GenreService);
  private readonly fb: FormBuilder = inject(FormBuilder);
  protected readonly destroy$: AutoDestroyService = inject(AutoDestroyService);

  $games: WritableSignal<Game[]> = signal([]);
  $genres: WritableSignal<Genre[]> = signal([]);
  $loading: Signal<boolean> = this.gamesSearchService.$loading;

  scrolled$: Subject<void> = new Subject<void>();
  filters$: BehaviorSubject<SearchFilters>;

  form: FormGroup;
  orderPreference: string = '-relevance';

  defaultSearchFilters: SearchFilters = {
    search: '',
    page_size: 50,
    ordering: '-relevance',
    genres: '',
  };
  params: PageParams = {
    title: 'Indica un titulo',
    showFilters: true,
  };

  constructor() {}
  ngOnInit(): void {
    if (this.params.showFilters) {
      this.initForm();
      this.getGenres();
    }
    this.subscribeToFiltersChange();
    this.subscribeToQueryChanges();
    this.suscribeToInfiniteScroll();
  }

  initForm(): void {
    this.form = this.fb.group({
      order: [this.defaultSearchFilters.ordering],
      genre: [this.defaultSearchFilters.genres],
    });
    this.subscribeToFormChanges();
  }

  //Subscripcion a los cambios del formulario
  subscribeToFormChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const ordering = this.form.controls['order'].value;
      const genres = this.form.controls['genre'].value;
      this.filters$.next({
        ...this.filters$.getValue(),
        ordering,
        genres,
      });
    });
  }

  //suscripcion a cambios en filtros tanto input como controlesy realiza la busqueda segun los filtros
  subscribeToFiltersChange(): void {
    this.filters$ = new BehaviorSubject<SearchFilters>({
      ...this.defaultSearchFilters,
    });

    this.filters$
      .pipe(
        tap(() => this.$games.set([])),
        switchMap((filters: SearchFilters) =>
          this.gamesSearchService.searchGames2(filters)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((data: SearchResult) => {
        this.$games.set(data.results);
      });
  }

  suscribeToInfiniteScroll(): void {
    this.scrolled$
      .pipe(
        exhaustMap(() => {
          return this.gamesSearchService.nextPage();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data: SearchResult) =>
        this.$games.update((values: Game[]) => {
          return [...values, ...data.results];
        })
      );
  }

  //suscripcion a los cambios del input buscador
  subscribeToQueryChanges(): void {
    this.gamesSearchService.queryString$
      .pipe(takeUntil(this.destroy$))
      .subscribe((query: string) => {
        this.filters$.next({
          ...this.filters$.getValue(),
          search: query,
        });
      });
  }

  getGenres(): void {
    this.genreService
      .getGenres()
      .pipe(take(1))
      .subscribe((genres: Genre[]) => {
        this.$genres.set(genres);
      });
  }
}
