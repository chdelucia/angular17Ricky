import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarCharacterComponent } from './similar-character.component';
import { CharacterService } from '@characters-data/services';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

const characterServiceStub = {
  searchCharacters: () => of({}),
  getDetails: () => of({ name: 'test' }),
};

describe('SimilarCharacterComponent', () => {
  let component: SimilarCharacterComponent;
  let fixture: ComponentFixture<SimilarCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimilarCharacterComponent],
      providers: [
        { provide: CharacterService, useValue: characterServiceStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SimilarCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
