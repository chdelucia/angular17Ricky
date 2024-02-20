import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ResolveFn } from '@angular/router';
import { Character } from '@characters-data/models';
import { CharacterService } from '@characters-data/services';
import { take, tap } from 'rxjs';

export const detailsResolver: ResolveFn<Character> = (route) => {
  const titleService = inject(Title);
  const characterService = inject(CharacterService);

  return characterService.getDetails(route.params['id']).pipe(
    take(1),
    tap((char) =>
      titleService.setTitle(`${char.name} | Angular 17 Ricky & Morty`),
    ),
  );
};
