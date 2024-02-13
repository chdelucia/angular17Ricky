import { Character } from './character.model';
import { Pagination } from './pagination.model';

export interface CharactersDto {
  info: Pagination;
  results: Character[];
}
