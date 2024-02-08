import { createReducer, on } from '@ngrx/store';
import {
  addResponse,
  addPageIndex,
  addTextSearch
} from './character.actions';

import { CharactersDto } from '@characters-data/models';

export interface CharState {
  response: CharactersDto | undefined;
  currentPage: number;
  textSearch: string;
}

const initialState: CharState = {
  response: undefined,
  currentPage: 1,
  textSearch: ''
};

export const characterReducer = createReducer(
  initialState,
  on(
    addResponse,
    (state, { response }): CharState => ({
      ...state,
      response,
    }),
  ),
  on(
    addPageIndex,
    (state, { currentPage }): CharState => ({
      ...state,
      currentPage,
    }),
  ),
  on(
    addTextSearch,
    (state, { textSearch }): CharState => ({
      ...state,
      currentPage: 1,
      textSearch,
    }),
  )
);
