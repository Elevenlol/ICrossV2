import { Component, Signal, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GenreService } from '../../../routes/games-page/services/genre.service';
import { Genre } from '../../models/game';
import { FormsModule } from '@angular/forms';
import { GameSearchService } from '../../services/common/game-search.service';
import { AutoDestroyService } from '../../services/utils/auto-destroy.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { AuthService } from '../../services/common/auth.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  $genres: Signal<Genre[]> = this.genreService.$genres;
  protected readonly authService: AuthService = inject(AuthService);
  protected readonly router: Router;
  constructor(
    private genreService: GenreService,
    private gameSearchService: GameSearchService,
    private destroy$: AutoDestroyService
  ) {}

  query: string = '';
  queryChange$: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.susbcribeToInput();
  }

  susbcribeToInput() {
    this.queryChange$
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query: string) => this.gameSearchService.setQuery(query));
  }
  logOut(): void {
    this.authService.logOut().subscribe(() => {
      this.router.navigateByUrl('');
    });
  }
}
