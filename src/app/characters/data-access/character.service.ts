import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { throwError, Observable, catchError } from 'rxjs';
import { Character, CharactersDto } from './models';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  searchCharacters(query: string, page: number): Observable<CharactersDto> {
    const filter = `${environment.baseUrlAPI}/?name=${query}&page=${page}`
    return this.http.get<CharactersDto>(filter)
  }

  getDetails(id: number): Observable<Character> {
    return this.http.get<Character>(`${environment.baseUrlAPI}/${id}`)
    .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.router.navigate(['/error']);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
