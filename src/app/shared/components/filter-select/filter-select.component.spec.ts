import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSelectComponent } from './filter-select.component';

describe('FilterSelectComponent', () => {
  let component: FilterSelectComponent;
  let fixture: ComponentFixture<FilterSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterSelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', [
      { value: '1', text: 'One' },
      { value: '2', text: 'Two' },
    ] as { value: string; text: string }[]);
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
