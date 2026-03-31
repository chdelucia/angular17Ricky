import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCardComponent } from './detail-card.component';

describe('DetailCardComponent', () => {
  let component: DetailCardComponent;
  let fixture: ComponentFixture<DetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailCardComponent);
    component = fixture.componentInstance;
    component.char = {
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
