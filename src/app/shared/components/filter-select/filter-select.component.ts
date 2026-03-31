import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-shared-filter-select',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FilterSelectComponent,
      multi: true,
    },
  ],
  templateUrl: './filter-select.component.html',
  styleUrl: './filter-select.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSelectComponent implements ControlValueAccessor {
  options = input.required<{ value: string; text: string }[]>();
  label = input.required<string>();

  value: string = '';

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  onSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
