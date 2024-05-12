import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable, delay, finalize, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Game, SearchResult } from '../../models/game';
import { SearchFilters } from '../../models/search-filters';

@Injectable({
  providedIn: 'root',
})
export class GameSearchService {
  $games: WritableSignal<Game[]> = signal([]);

  public $loading: WritableSignal<boolean> = signal(false);
  private queryString: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public nextUrl: string = '';
  public queryString$ = this.queryString.asObservable();
  constructor(private httpCliente: HttpClient) {}

  //Permite realizar busquedar en la barra de navegación, tambien permite que en caso de estar vacio muestre los resultados base
  searchGames2(filters: SearchFilters): Observable<SearchResult> {
    this.$loading.set(true);
    if (this.nextUrl) {
      return this.httpCliente
        .get<SearchResult>(this.nextUrl)
        .pipe(finalize(() => this.$loading.set(false)));
    }

    let params: HttpParams = new HttpParams({
      fromObject: { ...filters },
    });

    if (!filters.genres) params = params.delete('genres');
    return this.httpCliente
      .get<SearchResult>(
        `${environment.BASE_API_URL}games?key=${environment.API_KEY}`,
        { params }
      )
      .pipe(
        tap((result) => (this.nextUrl = result.next)),
        finalize(() => this.$loading.set(false))
      );
  }

  //Asigna el valor a $games
  setGames(games: Game[]): void {
    this.$games.update((values: Game[]) => {
      return [...values, ...games];
    });
  }
  //Asigna el valor a la query para buscar
  setQuery(queryString: string): void {
    this.queryString.next(queryString);
  }

  setNextUrl(nextUrl: string): void {
    this.nextUrl = nextUrl;
  }

  nextPage(): Observable<SearchResult> {
    this.$loading.set(true);
    return this.httpCliente.get<SearchResult>(this.nextUrl).pipe(
      tap((result) => (this.nextUrl = result.next)),
      finalize(() => this.$loading.set(false))
    );
  }
}
