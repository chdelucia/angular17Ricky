import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-shared-filter-name',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FilterNameComponent,
      multi: true,
    },
  ],
  templateUrl: './filter-name.component.html',
  styleUrl: './filter-name.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterNameComponent implements ControlValueAccessor {
  value: string = '';

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search(name: string) {
    this.value = name;
    this.onChange(name);
    this.onTouched();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
