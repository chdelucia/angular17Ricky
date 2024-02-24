import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-shared-filter-name',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterNameComponent),
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
    this.onChange(value);
    this.onTouched();
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search(name: string) {
    this.onChange(name);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
