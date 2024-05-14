import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { GameListComponent } from '../../../../shared/game-list/game-list.component';
import { SpinnerComponent } from '../../../../shared/spinner/spinner.component';
import { AbstractGamesPageComponent } from '../../../../shared/abstract-page/abstract-page.component';
import { NgTemplateOutlet } from '@angular/common';
import { SearchFilters } from '../../../../core/models/search-filters';
import { PageParams } from '../../../../core/models/page-params';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-games-page',
  standalone: true,
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GameListComponent,
    SpinnerComponent,
    NgTemplateOutlet,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  templateUrl: '../../../../shared/abstract-page/abstract-page.component.html',
})
export class GamesPageComponent extends AbstractGamesPageComponent {
  override defaultSearchFilters: SearchFilters = {
    ...this.defaultSearchFilters,

  };
  override params: PageParams = {
    ...this.params,
    title: 'All games',
  };
  constructor() {
    super();
  }
}
