import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { selectCharState, updateFilters } from '@characters-data/state';
import { CharacterStatus } from '@characters-feature/enums';
import { Store } from '@ngrx/store';
import { FilterNameComponent } from '@shared/components';
import { FilterSelectComponent } from '@shared/components/filter-select/filter-select.component';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  take,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    FilterSelectComponent,
    ReactiveFormsModule,
    FilterNameComponent,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  statusOptions = [
    { value: 'alive', text: CharacterStatus.ALIVE },
    { value: 'dead', text: CharacterStatus.DEAD },
    { value: 'unknown', text: CharacterStatus.UNKNOWN },
  ];

  genderOptions = [
    { value: 'female', text: 'Female' },
    { value: 'male', text: 'Male' },
    { value: 'genderless', text: 'Genderless' },
    { value: 'unknown', text: CharacterStatus.UNKNOWN },
  ];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.store
      .select(selectCharState)
      .pipe(take(1))
      .subscribe((state) => {
        this.form = new FormGroup({
          name: new FormControl(state.name),
          selectGender: new FormControl(state.gender),
          selectStatus: new FormControl(state.status),
        });
        this.initListenChanges();
      });
  }

  initListenChanges(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        distinctUntilChanged(),
        debounceTime(1000),
      )
      .subscribe((value) => {
        const obj = {
          name: value.name ?? '',
          gender: value.selectGender ?? '',
          status: value.selectStatus ?? '',
          page: 1,
        };
        this.store.dispatch(updateFilters(obj));
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
