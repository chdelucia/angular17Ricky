import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailComponent } from './character-detail.component';
import { CharacterService } from '@characters-data/services';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

const characterServiceStub = {
  getDetails: () => of({ name: 'test' }),
};

const LocationStub = {
  back: () => null,
};

const activatedRouteMock = {
  snapshot: {
    data: {
      detail: { name: 'test' },
    },
  },
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
        { provide: CharacterService, useValue: characterServiceStub },
        { provide: Location, useValue: LocationStub },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
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

  xit('should initialize character$ with data from service', () => {
    //fixture.componentRef.setInput('id', 8);
    //component.id = input<number>(1);
    component.ngOnInit();
  });
});
