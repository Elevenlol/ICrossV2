import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Genre } from '../../models/genre';
import { GenreService } from '../../../routes/games-page/services/genre.service';
import { AuthService } from '../../services/common/auth.service';

@Component({
  selector: 'app-aside-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  providers: [],
  templateUrl: './aside-bar.component.html',
  styleUrl: './aside-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideBarComponent {
  $genres: Signal<Genre[]> = this.genreService.$genres;
  constructor(private genreService: GenreService) {}
  protected readonly authService: AuthService = inject(AuthService);
}
