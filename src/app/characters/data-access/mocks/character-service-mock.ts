import { Observable, of } from 'rxjs';
import { CharactersDto } from '../models';

export const characterServiceMock = {
  searchCharacters(): Observable<CharactersDto> {
    return of({} as CharactersDto);
  },
};
