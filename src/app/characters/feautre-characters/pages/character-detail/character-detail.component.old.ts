import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  Signal,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Observable, catchError, of, take } from 'rxjs';
import { globalRoutes } from '@shared/routes.enum';
import { CharacterService } from '@characters-data/services';
import { Character } from '@characters-data/models';
import { DetailCardComponent } from '@characters-feature/components';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoaderComponent } from '@shared/components';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, DetailCardComponent, LoaderComponent],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailOLDComponent implements OnInit {
  id = input<number>(1);

  error = signal(null);

  character$!: Observable<Character | undefined>;

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
    this.character$ = this.characterService.getDetails(this.id()).pipe(
      take(1),
      catchError((error) => {
        this.error.set(error);
        return of(undefined);
      }),
    );
    this.item = toSignal(this.character$, { injector: this.injector });
  }

  goBack(): void {
    this.location.back();
  }
}
