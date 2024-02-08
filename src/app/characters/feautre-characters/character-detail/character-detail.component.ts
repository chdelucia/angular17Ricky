import { ChangeDetectionStrategy, Component, Input, OnInit, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { globalRoutes } from '@shared/routes.enum';
import { CharacterService } from '@characters-data/character.service';
import { Character } from '@characters-data/models';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterDetailComponent implements OnInit {
  @Input({ transform: numberAttribute }) id = 0;

  character$!: Observable<Character>;

  listRoute = `/${globalRoutes.HOME}`

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.character$ = this.characterService.getDetails(this.id);
  }

}
