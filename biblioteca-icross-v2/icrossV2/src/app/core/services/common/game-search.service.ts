import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Game, SearchResult } from '../../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameSearchService {
  $games: WritableSignal<Game[]> = signal([]);
  private queryString: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  public queryString$ = this.queryString.asObservable();
  constructor(private httpCliente: HttpClient) {}

  //Permite realizar busquedar en la barra de navegación, tambien permite que en caso de estar vacio muestre los resultados base
  searchGames(title: string = ''): Observable<SearchResult> {
    const params = new HttpParams({ fromObject: { search: title } });
    return this.httpCliente.get<SearchResult>(
      environment.BASE_API_URL + 'games',
      { params }
    );
  }

  getGameById(id: string) {
    return this.httpCliente.get<Game>(environment.BASE_API_URL + 'games/' + id);
  }

  setGames(games: Game[]): void {
    this.$games.set(games);
  }
  setQuery(queryString: string): void {
    this.queryString.next(queryString);
  }
}
