import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Character } from '@characters-data/models';

@Component({
  selector: 'app-character-detail-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './detail-card.component.html',
  styleUrl: './detail-card.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCardComponent {
  @Input({ required: true }) char!: Character;
}
