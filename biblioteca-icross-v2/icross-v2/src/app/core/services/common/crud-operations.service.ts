import { Injectable, Signal, inject, signal } from '@angular/core';
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  collectionData,
  setDoc,
} from '@angular/fire/firestore';
import { Game, SearchResult } from '../../models/game';
import { AuthService } from './auth.service';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudOperationsService {
  firestore = inject(Firestore);
  protected readonly authService: AuthService = inject(AuthService);
  username = this.authService.currentUserSig()?.username;
  colec = collection(this.firestore, `${this.username}/games/favoritos`);
  $games: Signal<Game[]> = signal([]);
  constructor() {}

  //añade un juego a la coleccion del usuario
  addGame(game: Game) {
    const colPath = `/games/favoritos`;
    const gameCol = collection(this.firestore, `${this.username}`, colPath);
    const gameDoc = doc(gameCol, `${game.id}`);
    setDoc(gameDoc, game);
  }

  //devuelve un observable con array de juegos
  getGames(): Observable<Game[]> {
    return collectionData(this.colec, { idField: 'id' }) as Observable<Game[]>;
  }


/*   checkFac(idGame: number): Observable<boolean> {
    return this.getGames().pipe(
      switchMap((games) => {
        return of(games.some((game) => game.id === idGame));
      })
    );
  } */

  deleteGameById(gameId: number): Promise<void> {
    const gameDocRef = doc(
      this.firestore,
      `${this.username}/games/favoritos/${gameId}`
    );
    return deleteDoc(gameDocRef);
  }

}
