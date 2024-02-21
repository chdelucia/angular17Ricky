import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { addGenderAndStatus, selectCharState } from '@characters-data/state';
import { CharacterStatus } from '@characters-feature/enums';
import { Store } from '@ngrx/store';
import { FilterNameComponent } from '@shared/components';
import { FilterSelectComponent } from '@shared/components/filter-select/filter-select.component';
import { debounceTime, distinctUntilChanged, take } from 'rxjs';

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
export class FiltersComponent implements OnInit {
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
          selectGender: new FormControl(state.gender),
          selectStatus: new FormControl(state.status),
        });
        this.initListenChanges();
      });
  }

  initListenChanges(): void {
    this.form.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(2000))
      .subscribe((value) => {
        const obj = {
          gender: value.selectGender ?? '',
          status: value.selectStatus ?? '',
        };
        this.store.dispatch(addGenderAndStatus(obj));
      });
  }
}
