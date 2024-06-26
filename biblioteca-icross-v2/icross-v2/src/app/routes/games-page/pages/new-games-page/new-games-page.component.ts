import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractGamesPageComponent } from '../../../../shared/abstract-page/abstract-page.component';
import { SearchFilters } from '../../../../core/models/search-filters';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { SpinnerComponent } from '../../../../shared/spinner/spinner.component';
import { GameListComponent } from '../../../../shared/game-list/game-list.component';
import { NgTemplateOutlet } from '@angular/common';
import { PageParams } from '../../../../core/models/page-params';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-new-games-page',
  standalone: true,
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GameListComponent,
    SpinnerComponent,
    NgTemplateOutlet,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  templateUrl: '../../../../shared/abstract-page/abstract-page.component.html',
})
export class NewGamesPageComponent extends AbstractGamesPageComponent {
  override defaultSearchFilters: SearchFilters = {
    ...this.defaultSearchFilters,
    ordering: '-released',
    metacritic: '80,100',
  };
  override params: PageParams = {
    title: 'Trends',
    subtitle: 'Most popular',
    showFilters: false,
  };
  constructor() {
    super();
  }
}
