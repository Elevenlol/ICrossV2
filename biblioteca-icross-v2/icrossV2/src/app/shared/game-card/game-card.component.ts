import { Component, Input } from '@angular/core';
import { Game } from '../../core/models/game';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  @Input({ required: true }) game: Game;
}
