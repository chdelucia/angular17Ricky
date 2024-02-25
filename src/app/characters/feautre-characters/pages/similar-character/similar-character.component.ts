import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Character, CharactersDto } from '@characters-data/models';
import { CharacterService } from '@characters-data/services';
import { CardComponent } from '@characters-feature/components';
import { globalRoutes } from '@shared/routes.enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-similar-character',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterModule],
  templateUrl: './similar-character.component.html',
  styleUrl: './similar-character.component.sass',
})
export class SimilarCharacterComponent implements OnInit {
  @Input({ required: true }) char!: Character;

  suggestedChars$!: Observable<CharactersDto>;

  detailRoute = `/${globalRoutes.CHAR_LIST}`;

  constructor(private charService: CharacterService) {}

  ngOnInit(): void {
    const { gender, status } = this.char;
    this.suggestedChars$ = this.charService.searchCharacters({
      gender,
      status,
    });
  }
}
