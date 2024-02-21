import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FilterNameComponent } from './filter-name.component';
import { addTextSearch } from '@characters-data/state';

describe('FilterNameComponent', () => {
  let component: FilterNameComponent;
  let fixture: ComponentFixture<FilterNameComponent>;
  let store: MockStore;
  const initialState = {
    response: undefined,
    page: 1,
    name: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterNameComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterNameComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addTextSearch action when updateStore is called', () => {
    const value = 'test';
    component.updateStore(value);
    expect(store.dispatch).toHaveBeenCalledWith(addTextSearch({ name: value }));
  });

  it('should return value from event target when getValue is called', () => {
    const event = { target: { value: 'test' } } as unknown as Event;
    const value = component.getValue(event);
    expect(value).toEqual('test');
  });
});
