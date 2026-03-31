import {
  ChangeDetectionStrategy,
  Component,
  numberAttribute,
  inject,
  effect,
  untracked,
  input,
} from '@angular/core';

import { CharacterListComponent } from '@characters-feature/pages';
import { PaginationComponent, NoResultsComponent } from '@shared/components';
import { CharacterStore } from '@characters-data/state';
import { CardSkeletonComponent } from '@characters-feature/components/card-skeleton/card-skeleton.component';
import { FilterNameSkeletonComponent } from '@shared/components/filter-name-skeleton/filter-name-skeleton.component';
import { FiltersComponent } from '@characters-feature/components/filters/filters.component';

@Component({
  selector: 'app-home',
  imports: [
    CharacterListComponent,
    PaginationComponent,
    NoResultsComponent,
    CardSkeletonComponent,
    FilterNameSkeletonComponent,
    FiltersComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly store = inject(CharacterStore);

  name = input('');
  gender = input('');
  status = input('');
  page = input(1, { transform: numberAttribute });

  constructor() {
    effect(() => {
      // Trigger reload when any of these signals change
      this.store.page();
      this.store.name();
      this.store.gender();
      this.store.status();
      untracked(() => this.store.loadCharacters());
    });

    effect(() => {
      this.store.updateFilters({
        page: isNaN(this.page()) ? 1 : this.page(),
        name: this.name() ?? '',
        gender: this.gender(),
        status: this.status(),
      });
    });
  }
}
