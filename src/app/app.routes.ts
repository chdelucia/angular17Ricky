import { Routes } from '@angular/router';
import { HomeComponent } from '@home/home.component';
import { globalRoutes } from '@shared/routes.enum';

export const routes: Routes = [
  {
    path: globalRoutes.HOME,
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: globalRoutes.CHAR_DETAIL,
    loadComponent: () =>
    import('@characters-feature/character-detail/character-detail.component').then(
      (mod) => mod.CharacterDetailComponent,
    ),
    title: 'details'
  },
  {
    path: '',
    redirectTo: globalRoutes.HOME,
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () =>
    import('@notfound/page-not-found.component').then(
      (mod) => mod.PageNotFoundComponent,
    ),
    title: '404 error'
  },
];
