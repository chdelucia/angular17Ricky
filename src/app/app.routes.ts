import { Routes } from '@angular/router';
import { HomeComponent } from '@home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'character',
    loadComponent: () =>
    import('@characters/character-list/character-list.component').then(
      (mod) => mod.CharacterListComponent,
    ),
    title: 'List'
  },
  {
    path: ':id',
    loadComponent: () =>
    import('@characters/character-detail/character-detail.component').then(
      (mod) => mod.CharacterDetailComponent,
    ),
    title: 'details'
  },
  {
    path: '',
    redirectTo: '/home',
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
