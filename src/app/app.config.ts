import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { characterReducer } from '@characters-data/state/character.reducer';
import { queryParamInterceptor } from '@characters-data/interceptor/query-param.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withInterceptors([queryParamInterceptor])),
    provideStore({ chars: characterReducer }),
  ],
};
