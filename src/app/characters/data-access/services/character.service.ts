import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { throwError, Observable, catchError } from 'rxjs';
import { Character, CharactersDto } from '../models';
import { Router } from '@angular/router';
import { CharState } from '@characters-data/state';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  searchCharacters(item: Partial<CharState>): Observable<CharactersDto> {
    let params = new HttpParams();

    Object.entries(item).forEach(([key, value]) => {
      if (value) params = params.set(key, value);
    });

    return this.http.get<CharactersDto>(environment.baseUrlAPI, { params });
  }

  getDetails(id: number): Observable<Character> {
    return this.http
      .get<Character>(`${environment.baseUrlAPI}/${id}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    //this.router.navigate(['/error']);
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }
}
