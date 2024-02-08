import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharState } from './character.reducer';

export const selectCharState = createFeatureSelector<CharState>('chars');

export const selectResponse = createSelector(
  selectCharState,
  (state) => state.response,
);

export const selectPage = createSelector(
  selectCharState,
  (state) => state.currentPage,
);

export const selectTextSearch = createSelector(
  selectCharState,
  (state) => state.textSearch,
);

export const selectChars = () => createSelector(
  selectResponse, (response) => response?.results
);

