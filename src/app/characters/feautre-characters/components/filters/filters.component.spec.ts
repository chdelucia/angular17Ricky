import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectCharState } from '@characters-data/state';

const initialState = {
  response: undefined,
  page: 1,
  name: '',
};

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: selectCharState,
              value: [{}],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
