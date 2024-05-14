import {
  Component,
  Input,
  OnInit,
  Signal,
  computed,
  inject,
} from '@angular/core';
import { Game } from '../../core/models/game';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/common/auth.service';
import { CrudOperationsService } from '../../core/services/common/crud-operations.service';
import { Observable, map } from 'rxjs';
import { BADNAME } from 'dns';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [DatePipe, RouterLink, NgOptimizedImage],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent implements OnInit {
  @Input({ required: true }) game: Game;
  constructor(
    private authService: AuthService,
    private crudOperator: CrudOperationsService
  ) {}

  favoriteGame(game: Game): void {
    this.crudOperator.addGame(game);
  }

  deleteGameFromFavorite(gameId: number) {
    this.crudOperator.deleteGameById(gameId).then();
  }

  ngOnInit(): void {}
}
