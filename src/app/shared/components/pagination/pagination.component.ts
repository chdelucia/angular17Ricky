import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Pagination } from '@characters-data/models';
import { Observable } from 'rxjs';
import { addPageIndex, selectPage } from '@characters-data/state';

@Component({
  selector: 'app-shared-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  private store = inject(Store);

  @Input({ required: true }) info!: Pagination;

  currentIndex$!: Observable<number>;

  ngOnInit(): void {
    this.currentIndex$ = this.store.select(selectPage);
  }

  emitPage(page: number): void {
    this.store.dispatch(addPageIndex({ page: page }));
  }
}
