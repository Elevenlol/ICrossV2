import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameDetails } from '../../models/game-details';
import { environment } from '../../../../environments/environment.development';

@Injectable()
export class GameService {
  constructor(private httlCliente: HttpClient) {}
  getGameById(id: number): Observable<GameDetails>{
    return this.httlCliente.get<GameDetails>(`${environment.BASE_API_URL}games/${id}`)

  }
}
