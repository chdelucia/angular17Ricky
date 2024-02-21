import { createAction, props } from '@ngrx/store';

export const addPageIndex = createAction(
  '[Character] Update pageIndex',
  props<{ page: number }>(),
);

export const addTextSearch = createAction(
  '[Character] Text search',
  props<{ name: string }>(),
);

export const addGender = createAction(
  '[Character] Update gender',
  props<{ gender: string }>(),
);

export const addStatus = createAction(
  '[Character] Update Status',
  props<{ status: string }>(),
);

export const addTextAndPage = createAction(
  '[Character] Update both',
  props<{ name: string; page: number }>(),
);

export const addGenderAndStatus = createAction(
  '[Character] Update Gender and Status',
  props<{ gender: string; status: string }>(),
);

export const updateFilters = createAction(
  '[Character] Update all the store',
  props<{ gender: string; status: string; name: string; page: number }>(),
);
