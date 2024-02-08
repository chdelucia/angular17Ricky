import { CharactersDto } from '@characters-data/models';
import { createAction, props } from '@ngrx/store';

export const addResponse = createAction(
  '[Character] Update response',
  props<{ response: CharactersDto }>(),
);

export const addPageIndex = createAction(
  '[Character] Update pageIndex',
  props<{ currentPage: number }>(),
);

export const addTextSearch = createAction(
  '[Character] Text search',
  props<{ textSearch: string }>(),
);
