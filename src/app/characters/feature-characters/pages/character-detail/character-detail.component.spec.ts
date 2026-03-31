import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailComponent } from './character-detail.component';
import { CharacterService } from '@characters-data/services';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { charResponse } from '@characters-data/mocks';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

const characterServiceStub = {
  getDetails: () => of({ name: 'test' }),
  searchCharacters: () => of(charResponse),
};

const LocationStub = {
  back: () => null,
};

const activatedRouteMock = {
  snapshot: {
    data: {
      detail: {
        id: 2,
        name: 'test',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'testorigin' },
        location: { name: 'testlocation' },
      },
    },
  },
};

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [CharacterDetailComponent, RouterTestingModule],
      providers: [
        { provide: CharacterService, useValue: characterServiceStub },
        { provide: Location, useValue: LocationStub },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '1');
    fixture.componentRef.setInput('detail', charResponse.results[0]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set character property from route snapshot data', () => {
    expect(component.detail().name).toEqual('Rick Sanchez');
  });

  it('should navigate back when goBack() is called', () => {
    const locationSpy = spyOn(LocationStub, 'back');
    component.goBack();
    expect(locationSpy).toHaveBeenCalled();
  });
});
