import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('info', {
      count: 100,
      pages: 10,
      next: 'next',
      prev: null,
    });
    fixture.componentRef.setInput('currentPage', 1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChange when emitPage is called', () => {
    const pageNumber = 2;
    const spy = spyOn(component.pageChange, 'emit');
    component.emitPage(pageNumber);
    expect(spy).toHaveBeenCalledWith(2);
  });
});
