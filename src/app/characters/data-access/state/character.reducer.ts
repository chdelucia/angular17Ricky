import { createReducer, on } from '@ngrx/store';
import {
  addPageIndex,
  addTextSearch,
  addTextAndPage,
  addGender,
  addStatus,
  addGenderAndStatus,
  updateFilters,
} from './character.actions';

export interface CharState {
  page: number;
  name: string;
  gender: string;
  status: string;
}

const initialState: CharState = {
  page: 1,
  name: '',
  gender: '',
  status: '',
};

export const characterReducer = createReducer(
  initialState,
  on(
    addPageIndex,
    (state, { page }): CharState => ({
      ...state,
      page,
    }),
  ),
  on(
    addTextSearch,
    (state, { name }): CharState => ({
      ...state,
      page: 1,
      name,
    }),
  ),
  on(
    addGender,
    (state, { gender }): CharState => ({
      ...state,
      gender,
    }),
  ),
  on(
    addStatus,
    (state, { status }): CharState => ({
      ...state,
      status,
    }),
  ),
  on(
    addTextAndPage,
    (state, { name, page }): CharState => ({
      ...state,
      name,
      page,
    }),
  ),
  on(
    addGenderAndStatus,
    (state, { gender, status }): CharState => ({
      ...state,
      gender,
      status,
      page: 1,
    }),
  ),
  on(
    updateFilters,
    (state, { page, name, gender, status }): CharState => ({
      ...state,
      page,
      name,
      gender,
      status,
    }),
  ),
);
