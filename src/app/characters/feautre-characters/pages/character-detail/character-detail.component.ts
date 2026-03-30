import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  inject,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { globalRoutes } from '@shared/routes.enum';
import { Character } from '@characters-data/models';
import { DetailCardComponent } from '@characters-feature/components';
import { LoaderComponent } from '@shared/components';
import { SimilarCharacterComponent } from '../similar-character/similar-character.component';

@Component({
  selector: 'app-character-detail',
  imports: [
    RouterModule,
    DetailCardComponent,
    LoaderComponent,
    SimilarCharacterComponent,
  ],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailComponent implements OnChanges {
  private location = inject(Location);
  private route = inject(ActivatedRoute);

  @Input() id!: string;
  character!: Character;

  listRoute = `/${globalRoutes.HOME}`;

  ngOnChanges(): void {
    this.character = this.route.snapshot.data['detail'];
  }

  goBack(): void {
    this.location.back();
  }
}
