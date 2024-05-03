import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutoDestroyService } from '../services/utils/auto-destroy.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { GameSearchService } from '../services/common/game-search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  providers: [AutoDestroyService],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  query: string = '';
  queryChange$: Subject<string> = new Subject<string>();
  constructor(
    private gameSearchService: GameSearchService,
    private destroy$: AutoDestroyService
  ) {}
  ngOnInit(): void {
    this.susbcribeToInput();
  }
  susbcribeToInput() {
    this.queryChange$
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query: string) => this.gameSearchService.setQuery(query));
  }
}
