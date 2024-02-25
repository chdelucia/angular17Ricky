import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { globalRoutes } from '@shared/routes.enum';
import { Character } from '@characters-data/models';
import { DetailCardComponent } from '@characters-feature/components';
import { LoaderComponent } from '@shared/components';
import { SimilarCharacterComponent } from '../similar-character/similar-character.component';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [
    CommonModule,
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
  @Input() id!: string;
  character!: Character;

  listRoute = `/${globalRoutes.HOME}`;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
  ) {}

  ngOnChanges(): void {
    this.character = this.route.snapshot.data['detail'];
  }

  goBack(): void {
    this.location.back();
  }
}
