import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-shared-filter-select',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterSelectComponent),
      multi: true,
    },
  ],
  templateUrl: './filter-select.component.html',
  styleUrl: './filter-select.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSelectComponent implements ControlValueAccessor {
  @Input({ required: true }) options!: { value: string; text: string }[];
  @Input({ required: true }) label!: string;

  value: string = '';

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  onSelect(value: Event): void {
    const target = value.target as HTMLSelectElement;
    this.onChange(target.value);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
