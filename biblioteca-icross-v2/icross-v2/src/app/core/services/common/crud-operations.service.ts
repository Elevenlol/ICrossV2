import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  collectionData,
  documentId,
  setDoc,
  getDoc,
  getFirestore,
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


  removeGame(game: Game) {
    const gameCollection = doc(this.firestore, `${this.username}/${game.id}`);
    return deleteDoc(gameCollection);
  }
  checkFac(idGame: number): Observable<boolean> {
    // Obtener los juegos del usuario (suponiendo que getGames() devuelve un observable)
    return this.getGames().pipe(
      switchMap((games) => {
        // Verificar si el juego está presente en la lista de juegos
        return of(games.some((game) => game.id === idGame));
      })
    );
  }
  deleteGameById(gameId: number): Promise<void> {
    const gameDocRef = doc(
      this.firestore,
      `${this.username}/games/favoritos/${gameId}`
    );
    return deleteDoc(gameDocRef);
  }

  /* 
  countGames(games: Game[]) {
    return count(games.cou);
  } */
}
