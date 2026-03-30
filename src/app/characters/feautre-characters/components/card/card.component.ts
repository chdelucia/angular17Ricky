import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Character } from '@characters-data/models';
import { CharacterStatus } from '@characters-feature/enums';

@Component({
  selector: 'app-character-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  character = input.required<Character>();

  deadStatus = CharacterStatus.DEAD;
}
