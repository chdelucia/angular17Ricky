import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  numberAttribute,
  inject,
} from '@angular/core';

import { Observable, take, skip } from 'rxjs';
import { CharacterListComponent } from '@characters-feature/pages';
import { CharactersDto } from '@characters-data/models';
import { CharacterService } from '@characters-data/services/character.service';
import {
  LoaderComponent,
  PaginationComponent,
  FilterNameComponent,
  NoResultsComponent,
} from '@shared/components';
import { Store } from '@ngrx/store';
import {
  CharState,
  selectCharState,
  updateFilters,
} from '@characters-data/state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardSkeletonComponent } from '@characters-feature/components/card-skeleton/card-skeleton.component';
import { FilterNameSkeletonComponent } from '@shared/components/filter-name-skeleton/filter-name-skeleton.component';
import { FiltersComponent } from '@characters-feature/components/filters/filters.component';

@Component({
  selector: 'app-home',
  imports: [
    FilterNameComponent,
    CharacterListComponent,
    PaginationComponent,
    LoaderComponent,
    NoResultsComponent,
    CardSkeletonComponent,
    FilterNameSkeletonComponent,
    FiltersComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private characterService = inject(CharacterService);
  private store = inject(Store);
  private cdr = inject(ChangeDetectorRef);

  @Input() name = '';
  @Input() gender = '';
  @Input() status = '';
  @Input({ transform: numberAttribute }) page = 1;

  charactersResponse!: CharactersDto;

  noResult = false;

  state$!: Observable<CharState>;

  constructor() {
    this.state$ = this.store.select(selectCharState);

    this.state$.pipe(takeUntilDestroyed(), skip(2)).subscribe((response) => {
      this.getCharacters(response);
    });
  }

  ngOnInit(): void {
    const queryParams = {
      page: isNaN(this.page) ? 1 : this.page,
      name: this.name ?? '',
      gender: this.gender,
      status: this.status,
    };
    this.getCharacters(queryParams);
    this.updateState(queryParams);
  }

  private updateState(state: CharState): void {
    this.store.dispatch(updateFilters(state));
  }

  private getCharacters(queryParams: CharState) {
    this.characterService
      .searchCharacters(queryParams)
      .pipe(
        take(1),
        //catchError((err) => of([] as any)),
      )
      .subscribe({
        next: (response) => {
          this.noResult = false;
          this.charactersResponse = response;
          this.cdr.markForCheck();
        },
        error: () => {
          //TODO manejar cuando el usuario se inventa la page o el name
          console.log('error');
          this.noResult = true;
          this.cdr.markForCheck();
        },
      });
  }
}
