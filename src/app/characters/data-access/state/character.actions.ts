import { createAction, props } from '@ngrx/store';

export const addPageIndex = createAction(
  '[Character] Update pageIndex',
  props<{ currentPage: number }>(),
);

export const addTextSearch = createAction(
  '[Character] Text search',
  props<{ textSearch: string }>(),
);

export const addTextAndPage = createAction(
  '[Character] Update both',
  props<{ textSearch: string; currentPage: number }>(),
);
