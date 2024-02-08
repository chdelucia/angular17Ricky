import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { addTextSearch, selectTextSearch } from '@characters-data/state';
import { Store } from '@ngrx/store';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filter-name',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-name.component.html',
  styleUrl: './filter-name.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterNameComponent {
  private searchText$ = new Subject<string>();

  currentText$!: Observable<string | null>;

  constructor(private store: Store) {
    this.currentText$ = this.store.select(selectTextSearch);

    this.searchText$.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe(value => this.updateStore(value));
  }

  updateStore(value: string): void {
    this.store.dispatch(addTextSearch({ textSearch: value}))
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search(packageName: string) {
    this.searchText$.next(packageName);
  }
}
