import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
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
  info = input.required<Pagination | null>();
  currentPage = input.required<number>();
  pageChange = output<number>();

  emitPage(page: number): void {
    this.pageChange.emit(page);
  }
}
