import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharState } from './character.reducer';

export const selectCharState = createFeatureSelector<CharState>('chars');

export const selectPage = createSelector(
  selectCharState,
  (state) => state.currentPage,
);

export const selectTextSearch = createSelector(
  selectCharState,
  (state) => state.textSearch,
);

