import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.character = {
      id: '1',
      image: '',
      name: 'test',
      status: 'Dead',
      species: 'Human',
      gender: 'Male',
      origin: { name: 'casa', url: 'test' },
      location: { name: 'casa', url: 'test' },
      type: 'typeTest',
      url: ['urlTest'],
      episode: ['2'],
      created: 'today',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
