import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { characterReducer } from '@characters-data/state';
import { queryParamInterceptor } from '@characters-data/interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withHashLocation(),
      withComponentInputBinding(),
      withViewTransitions(),
    ),
    provideHttpClient(withInterceptors([queryParamInterceptor])),
    provideStore({ chars: characterReducer }),
  ],
};
