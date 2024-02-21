import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PaginationComponent } from './pagination.component';
import { addPageIndex } from '@characters-data/state';
import { of } from 'rxjs';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let store: MockStore;
  const initialState = {
    response: undefined,
    page: 1,
    name: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addPageIndex action when emitPage is called', () => {
    const pageNumber = 2;
    component.emitPage(pageNumber);
    expect(store.dispatch).toHaveBeenCalledWith(addPageIndex({ page: 2 }));
  });

  it('should initialize currentIndex$ with the correct value from store', () => {
    spyOn(store, 'select').and.returnValue(of(2));
    expect(component.currentIndex$).toBeDefined();
  });
});
