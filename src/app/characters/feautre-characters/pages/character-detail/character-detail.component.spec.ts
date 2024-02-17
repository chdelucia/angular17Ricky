import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailComponent } from './character-detail.component';
import { CharacterService } from '@characters-data/services';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA, input } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

const characterServiceStub = {
  getDetails: () => of({ name: 'test' }),
};

const LocationStub = {
  back: () => null,
};

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CharacterDetailComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        { CharacterService, useValue: characterServiceStub },
        { Location, useValue: LocationStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize character$ with data from service', () => {
    fixture.componentRef.setInput('id', 8);
    component.id = input<number>(1);
    component.ngOnInit();

    expect(component.character$).toBeDefined();
  });
});
