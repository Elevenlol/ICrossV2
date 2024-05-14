import { WritableSignal, signal } from '@angular/core';
import { Game } from './game';

export interface UserInterface {
  email: string;
  username: string;
}
export class User {
  $favouriteGames?: WritableSignal<Map<number, Game>> = signal(new Map());
  email: string;
  username: string;
}
