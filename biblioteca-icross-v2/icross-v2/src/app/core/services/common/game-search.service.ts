import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, finalize, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Game, SearchResult } from '../../models/game';
import { SearchFilters } from '../../models/search-filters';

@Injectable({
  providedIn: 'root',
})
export class GameSearchService {
  public $loading: WritableSignal<boolean> = signal(false);
  private queryString: Subject<string> = new Subject<string>();
  public queryString$ = this.queryString.asObservable();
  public nextUrl: string = '';
  constructor(private httpCliente: HttpClient) {}

  //Permite realizar busquedar en la barra de navegación, tambien permite que en caso de estar vacio muestre los resultados base
  searchGames2(filters: SearchFilters): Observable<SearchResult> {
    this.$loading.set(true);
    let params: HttpParams = new HttpParams({
      fromObject: { ...filters },
    });
    if (!filters.genres) params = params.delete('genres');
    return this.httpCliente
      .get<SearchResult>(`${environment.BASE_API_URL}games`, { params })
      .pipe(
        tap((result) => (this.nextUrl = result.next)),
        finalize(() => this.$loading.set(false))
      );
  }

  //Asigna el valor a la query para buscar
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
