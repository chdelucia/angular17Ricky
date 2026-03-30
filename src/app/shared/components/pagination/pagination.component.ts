import {
  ChangeDetectionStrategy,
  Component,
  input,
  inject,
} from '@angular/core';
import { CharacterStore } from '@characters-data/state';
import { CommonModule } from '@angular/common';
import { Pagination } from '@characters-data/models';

@Component({
  selector: 'app-shared-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  readonly store = inject(CharacterStore);

  info = input.required<Pagination | null>();

  emitPage(page: number): void {
    this.store.updateFilters({ page });
  }
}
