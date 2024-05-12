import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutoDestroyService } from '../services/utils/auto-destroy.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { GameSearchService } from '../services/common/game-search.service';
import { FormsModule } from '@angular/forms';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AsideBarComponent } from './aside-bar/aside-bar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet,FormsModule,TopBarComponent,AsideBarComponent],
  providers: [AutoDestroyService],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {

}
