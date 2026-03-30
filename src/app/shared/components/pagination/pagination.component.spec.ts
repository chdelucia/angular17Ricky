import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { CharacterStore } from '@characters-data/state';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let store: InstanceType<typeof CharacterStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [CharacterStore],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    store = TestBed.inject(CharacterStore);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('info', {
      count: 100,
      pages: 10,
      next: 'next',
      prev: null,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update page filter when emitPage is called', () => {
    const pageNumber = 2;
    const spy = spyOn(store, 'updateFilters');
    component.emitPage(pageNumber);
    expect(spy).toHaveBeenCalledWith({ page: 2 });
  });
});
