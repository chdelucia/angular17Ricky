import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-filter-name',
  standalone: true,
  imports: [],
  templateUrl: './filter-name.component.html',
  styleUrl: './filter-name.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterNameComponent implements OnInit {
  @Output() valueChange = new EventEmitter<string>();

  private searchText$ = new Subject<string>();

  ngOnInit(): void {
    this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => this.valueChange.emit(value));
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search(packageName: string) {
    this.searchText$.next(packageName);
  }
}
