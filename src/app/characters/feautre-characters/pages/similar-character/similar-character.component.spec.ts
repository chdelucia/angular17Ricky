import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarCharacterComponent } from './similar-character.component';

describe('SimilarCharacterComponent', () => {
  let component: SimilarCharacterComponent;
  let fixture: ComponentFixture<SimilarCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimilarCharacterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SimilarCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
