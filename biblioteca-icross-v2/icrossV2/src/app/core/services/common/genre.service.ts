import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Genre } from '../../models/game';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  genres: WritableSignal<any> = signal({});
  constructor(private httpClient: HttpClient) {}

  getGenres(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>(
      `${environment.ALTERNATIVE_API_URL}genres`
    );
  }
}
