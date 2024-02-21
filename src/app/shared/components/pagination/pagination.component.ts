import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Pagination } from '@characters-data/models';
import { Observable } from 'rxjs';
import { addPageIndex, selectPage } from '@characters-data/state';

@Component({
  selector: 'app-shared-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  @Input({ required: true }) info!: Pagination;

  currentIndex$!: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.currentIndex$ = this.store.select(selectPage);
  }

  emitPage(page: number): void {
    this.store.dispatch(addPageIndex({ page: page }));
  }
}
