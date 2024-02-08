import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { throwError, Observable, catchError, tap, shareReplay } from 'rxjs';
import { Character, CharactersDto } from './models';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  prevInfo!: CharactersDto;

  searchCharacters(query: string, page?: number): Observable<CharactersDto> {
    const filter = page ?
      `${environment.baseUrlAPI}/?name=${query}&page=${page}`
      : query;

    return this.http.get<CharactersDto>(filter)
    .pipe(
      tap((data: CharactersDto) => this.prevInfo = data),
      catchError((err) => this.handleError(err))
      );
  }

  getDetails(id: number): Observable<Character> {
    return this.http.get<Character>(`${environment.baseUrlAPI}/${id}`)
    .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
