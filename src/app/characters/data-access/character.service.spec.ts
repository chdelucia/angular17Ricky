import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { CharacterService } from './character.service';
import { environment } from '@env/environment';
import { Character, CharactersDto } from './models';

describe('CharacterService', () => {
  let service: CharacterService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(CharacterService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET request with correct filter parameters', () => {
    const query = 'Batman';
    const page = 1;
    const expectedUrl = `${environment.baseUrlAPI}/?name=${query}&page=${page}`;

    service.searchCharacters(query, page).subscribe();

    const req = httpTesting.expectOne(expectedUrl);
    expect(req.request.url).toEqual(
      `${environment.baseUrlAPI}/?name=${query}&page=${page}`,
    );
    expect(req.request.method).toBe('GET');

    req.flush({} as CharactersDto);
  });

  it('should send a GET request with correct URL and return data', () => {
    const id = 123;
    const testData: Partial<Character> = { id: '3' };

    service.getDetails(id).subscribe();
    const req = httpTesting.expectOne(`${environment.baseUrlAPI}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should handle error when HTTP request fails', () => {
    const id = 123;
    const errorMessage = 'Something bad happened; please try again later.';

    service.getDetails(id).subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
        expect(err.message).toBe(errorMessage);
      },
    });

    const req = httpTesting.expectOne(`${environment.baseUrlAPI}/${id}`);
    expect(req.request.method).toBe('GET');

    req.error(
      new ErrorEvent('error', {
        error: new Error(errorMessage),
      }),
    );
  });
});
