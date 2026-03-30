import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  DestroyRef,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CharacterStore } from '@characters-data/state';
import { CharacterStatus } from '@characters-feature/enums';
import { FilterNameComponent } from '@shared/components';
import { FilterSelectComponent } from '@shared/components/filter-select/filter-select.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filters',
  imports: [FilterSelectComponent, ReactiveFormsModule, FilterNameComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  private store = inject(CharacterStore);
  private destroyRef = inject(DestroyRef);

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

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.store.name()),
      selectGender: new FormControl(this.store.gender()),
      selectStatus: new FormControl(this.store.status()),
    });
    this.initListenChanges();
  }

  initListenChanges(): void {
    this.form.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
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
        this.store.updateFilters(obj);
      });
  }
}
