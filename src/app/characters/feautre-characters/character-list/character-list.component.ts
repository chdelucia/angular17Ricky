import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../data-access/models';
import { globalRoutes } from '@shared/routes.enum';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterListComponent {
  @Input({required: true, alias: 'chars'}) characters!: Character[]

  detailRoute = `/${globalRoutes.CHAR_LIST}`

}
