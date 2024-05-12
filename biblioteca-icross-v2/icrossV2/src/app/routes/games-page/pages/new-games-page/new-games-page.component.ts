import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractGamesPageComponent } from '../../../../shared/abstract-page/abstract-page.component';
import { SearchFilters } from '../../../../core/models/search-filters';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { SpinnerComponent } from '../../../../shared/spinner/spinner.component';
import { GameListComponent } from '../../../../shared/game-list/game-list.component';
import { NgTemplateOutlet } from '@angular/common';
import { PageParams } from '../../../../core/models/page-params';

@Component({
  selector: 'app-new-games-page',
  standalone: true,
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GameListComponent, SpinnerComponent, NgTemplateOutlet],
  templateUrl:
    '../../../../shared/abstract-page/abstract-page.component.html',
})
export class NewGamesPageComponent extends AbstractGamesPageComponent {
  override searchFilters: SearchFilters = {
    ...this.searchFilters,
    ordering: '-released',
    metacritic: '80,100',
  };
  override params: PageParams = {
    title: 'Nuevos y tendencia',
    subtitle: 'Lo más popular',
  };
  constructor() {
    super();
  }
}
