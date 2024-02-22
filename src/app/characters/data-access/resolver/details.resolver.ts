import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ResolveFn, Router } from '@angular/router';
import { Character } from '@characters-data/models';
import { CharacterService } from '@characters-data/services';
import { take, tap } from 'rxjs';

export const detailsResolver: ResolveFn<Character> = (route) => {
  const titleService = inject(Title);
  const characterService = inject(CharacterService);
  const router = inject(Router);
  const data = router.getCurrentNavigation()?.extras.state;
  const details: Character = data ? data['details'] : undefined;

  if (details) {
    titleService.setTitle(`${details.name} | xAngular 17 Ricky & Morty`);
    return details;
  }
  return characterService.getDetails(route.params['id']).pipe(
    take(1),
    tap((char) =>
      titleService.setTitle(`${char.name} | Angular 17 Ricky & Morty`),
    ),
  );
};
