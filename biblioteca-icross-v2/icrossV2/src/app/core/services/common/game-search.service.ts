import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Game, SearchResult } from '../../models/game';
import { SearchFilters } from '../../models/search-filters';

@Injectable({
  providedIn: 'root',
})
export class GameSearchService {
  $games: WritableSignal<Game[]> = signal([]);

  public $loading: WritableSignal<boolean> = signal(false);
  private queryString: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public nextUrl: string = '';
  public queryString$ = this.queryString.asObservable();
  constructor(private httpCliente: HttpClient) {}

  //Permite realizar busquedar en la barra de navegación, tambien permite que en caso de estar vacio muestre los resultados base
  searchGames(title: string = ''): Observable<SearchResult> {
    const params = new HttpParams({ fromObject: { search: title } });
    return this.httpCliente.get<SearchResult>(
      environment.ALTERNATIVE_API_URL + 'games',
      { params }
    );
  }

  searchGames2(filters: SearchFilters): Observable<SearchResult> {
    this.$loading.set(true);
    let params: HttpParams = new HttpParams({
      fromObject: { ...filters },
    });
    if (!filters.genres) params = params.delete('genres');
    return this.httpCliente
      .get<SearchResult>(`${environment.ALTERNATIVE_API_URL}games`, { params })
      .pipe(
        tap((result) => (this.nextUrl = result.next)),
        finalize(() => this.$loading.set(false))
      );
  }
  
  setGames(games: Game[]): void {
    this.$games.set(games);
  }
  setQuery(queryString: string): void {
    this.queryString.next(queryString);
  }
  nextPage(): Observable<SearchResult> {
    this.$loading.set(true);
    return this.httpCliente.get<SearchResult>(this.nextUrl).pipe(
      tap((result) => (this.nextUrl = result.next)),
      finalize(() => this.$loading.set(false))
    );
  }
}
