import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Game } from '../../core/models/game';
import { GameCardComponent } from '../game-card/game-card.component';
import { Observable, map } from 'rxjs';
import { CrudOperationsService } from '../../core/services/common/crud-operations.service';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [GameCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss',
})
export class GameListComponent {
  @Input({ required: true }) games: Game[] = [];
}
