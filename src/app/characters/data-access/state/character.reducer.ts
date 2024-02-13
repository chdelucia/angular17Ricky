import { createReducer, on } from '@ngrx/store';
import {
  addPageIndex,
  addTextSearch,
  addTextAndPage,
} from './character.actions';

export interface CharState {
  currentPage: number;
  textSearch: string;
}

const initialState: CharState = {
  currentPage: 1,
  textSearch: '',
};

export const characterReducer = createReducer(
  initialState,
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
  ),
  on(
    addTextAndPage,
    (state, { textSearch, currentPage }): CharState => ({
      ...state,
      textSearch,
      currentPage,
    }),
  ),
);
