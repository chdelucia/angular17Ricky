import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Character } from '@characters-data/models';
import { CardComponent } from '@characters-feature/components';
import { RouterModule } from '@angular/router';
import { globalRoutes } from '@shared/routes.enum';

@Component({
  selector: 'app-character-list',
  imports: [CardComponent, RouterModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListComponent {
  characters = input.required<Character[]>();

  detailRoute = `/${globalRoutes.CHAR_LIST}`;
}
