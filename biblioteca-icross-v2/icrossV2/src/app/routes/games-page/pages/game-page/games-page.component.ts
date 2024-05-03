import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs';
import { GameSearchService } from '../../../../core/services/common/game-search.service';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { GameListComponent } from '../../../../shared/game-list/game-list.component';
import { GameCardComponent } from '../../../../shared/game-card/game-card.component';

@Component({
  selector: 'app-games-page',
  standalone: true,
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GameListComponent, GameCardComponent],
  templateUrl: './games-page.component.html',
  styleUrl: './games-page.component.scss',
})
export class GamesPageComponent implements OnInit {
  $games = this.gameSearchService.$games;
  constructor(
    private gameSearchService: GameSearchService,
    private $destroy: AutoDestroyService
  ) {}
  ngOnInit(): void {
    this.gameSearchService.queryString$.pipe(
      switchMap((title: string) => this.gameSearchService.searchGames(title)),
      takeUntil(this.$destroy)
    ).subscribe((data)=>this.gameSearchService.setGames(data.results));

    /*     this.gameSearchService
      .searchGames()
      .pipe(takeUntil(this.$destroy))
      .subscribe((data) => {
        this.gameSearchService.setGames(data.results);
      }); */
  }
}
