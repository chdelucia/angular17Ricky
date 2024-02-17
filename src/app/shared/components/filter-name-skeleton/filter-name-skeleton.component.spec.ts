import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterNameSkeletonComponent } from './filter-name-skeleton.component';

describe('FilterNameSkeletonComponent', () => {
  let component: FilterNameSkeletonComponent;
  let fixture: ComponentFixture<FilterNameSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterNameSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterNameSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
