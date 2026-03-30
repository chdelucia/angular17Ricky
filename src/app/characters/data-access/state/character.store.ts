import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { CharacterService } from '../services/character.service';
import { CharactersDto } from '../models';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export interface CharacterState {
  page: number;
  name: string;
  gender: string;
  status: string;
  charactersResponse: CharactersDto | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CharacterState = {
  page: 1,
  name: '',
  gender: '',
  status: '',
  charactersResponse: null,
  isLoading: false,
  error: null,
};

export const CharacterStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ charactersResponse }) => ({
    characters: () => charactersResponse()?.results ?? [],
    info: () => charactersResponse()?.info ?? null,
  })),
  withMethods((store, characterService = inject(CharacterService)) => ({
    updateFilters: (
      filters: Partial<
        Omit<CharacterState, 'charactersResponse' | 'isLoading' | 'error'>
      >,
    ) => {
      patchState(store, (state) => ({ ...state, ...filters }));
    },
    loadCharacters: rxMethod<void>(
      pipe(
        switchMap(() => {
          patchState(store, { isLoading: true, error: null });
          const { page, name, gender, status } = store;
          return characterService
            .searchCharacters({
              page: page(),
              name: name(),
              gender: gender(),
              status: status(),
            })
            .pipe(
              tapResponse({
                next: (response: CharactersDto) =>
                  patchState(store, {
                    charactersResponse: response,
                    isLoading: false,
                  }),
                error: () => {
                  patchState(store, {
                    charactersResponse: null,
                    isLoading: false,
                    error: 'Error loading characters',
                  });
                },
              }),
            );
        }),
      ),
    ),
  })),
);
