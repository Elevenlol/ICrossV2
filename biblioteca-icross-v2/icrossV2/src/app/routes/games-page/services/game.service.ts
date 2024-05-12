import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameDetails } from '../../../core/models/game-details';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class GameService  {
  constructor(private httpClient: HttpClient) {}

  getGameById(id: number): Observable<GameDetails> {
    return this.httpClient.get<GameDetails>(
      `${environment.BASE_API_URL}games/${id}`
    );
  }
  getGameById2(id: number): Observable<GameDetails> {
    return this.httpClient.get<GameDetails>(
      `${environment.ALTERNATIVE_API_URL}games/${id}`
    );
  }
}
