import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharState } from './character.reducer';

export const selectCharState = createFeatureSelector<CharState>('chars');

export const selectPage = createSelector(
  selectCharState,
  (state) => state.page,
);

export const selectTextSearch = createSelector(
  selectCharState,
  (state) => state.name,
);

export const selectGender = createSelector(
  selectCharState,
  (state) => state.gender,
);

export const selectStatus = createSelector(
  selectCharState,
  (state) => state.status,
);
