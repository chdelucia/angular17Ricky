import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Character } from '@characters-data/models';
import { CharacterStatus } from '@characters-feature/enums';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent {
  @Input({ required: true }) character!: Character;

  deadStatus = CharacterStatus.DEAD;
}
