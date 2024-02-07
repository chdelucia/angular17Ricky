import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../data-access/character.service';
import { Observable } from 'rxjs';
import { CharactersDto } from '../../data-access/models/characters-dto';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterListComponent {
  characters$!: Observable<CharactersDto>

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.characters$ = this.characterService.searchCharacters();
  }

}
