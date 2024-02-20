import { Routes } from '@angular/router';
import { detailsResolver } from '@characters-data/resolver/details.resolver';
import { HomeComponent } from '@home/home.component';
import { globalRoutes } from '@shared/routes.enum';

export const routes: Routes = [
  {
    path: globalRoutes.HOME,
    component: HomeComponent,
    title: 'Home | Angular 17 Ricky & Morty',
  },
  {
    path: globalRoutes.CHAR_DETAIL,
    loadComponent: () =>
      import('@characters-feature/pages').then(
        (mod) => mod.CharacterDetailComponent,
      ),
    resolve: { detail: detailsResolver },
  },
  {
    path: '',
    redirectTo: globalRoutes.HOME,
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('@notfound/page-not-found.component').then(
        (mod) => mod.PageNotFoundComponent,
      ),
    title: '404 error | Angular 17 Ricky & Morty',
  },
];
