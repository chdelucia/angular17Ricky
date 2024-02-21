import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { selectCharState } from '@characters-data/state';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;

  const initialState = {
    response: undefined,
    page: 1,
    name: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: selectCharState,
              value: [{}],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    spyOn(store, 'select').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
