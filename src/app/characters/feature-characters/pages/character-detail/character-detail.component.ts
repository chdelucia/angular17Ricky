import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { globalRoutes } from '@shared/routes.enum';
import { Character } from '@characters-data/models';
import { DetailCardComponent } from '@characters-feature/components';
import { SimilarCharacterComponent } from '../similar-character/similar-character.component';

@Component({
  selector: 'app-character-detail',
  imports: [RouterModule, DetailCardComponent, SimilarCharacterComponent],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailComponent {
  private location = inject(Location);

  id = input.required<string>();
  detail = input.required<Character>();

  listRoute = `/${globalRoutes.HOME}`;

  goBack(): void {
    this.location.back();
  }
}
