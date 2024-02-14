import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  Signal,
  computed,
  inject,
  input,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Observable, take } from 'rxjs';
import { RouterModule } from '@angular/router';
import { globalRoutes } from '@shared/routes.enum';
import { CharacterService } from '@characters-data/services';
import { Character } from '@characters-data/models';
import { DetailCardComponent } from '@characters-feature/components';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoaderComponent } from '@shared/components';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DetailCardComponent, LoaderComponent],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailComponent implements OnInit {
  id = input<number>(1);

  character$!: Observable<Character>;

  item!: Signal<Character | undefined>;
  private injector = inject(Injector);

  loaded = computed(() => {
    return !!this.item()?.name;
  });

  listRoute = `/${globalRoutes.HOME}`;

  constructor(
    private characterService: CharacterService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.character$ = this.characterService.getDetails(this.id()).pipe(take(1));
    this.item = toSignal(this.character$, { injector: this.injector });
  }

  goBack(): void {
    this.location.back();
  }
}
