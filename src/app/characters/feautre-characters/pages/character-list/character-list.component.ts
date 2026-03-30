import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Character } from '@characters-data/models';
import { CardComponent } from '@characters-feature/components';
import { RouterModule } from '@angular/router';
import { globalRoutes } from '@shared/routes.enum';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CardComponent, RouterModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListComponent {
  @Input({ required: true }) characters!: Character[];

  detailRoute = `/${globalRoutes.CHAR_LIST}`;
}
