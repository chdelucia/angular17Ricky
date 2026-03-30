import { CommonModule } from '@angular/common';
import { Component, input, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Character, CharactersDto } from '@characters-data/models';
import { CharacterService } from '@characters-data/services';
import { CardComponent } from '@characters-feature/components';
import { globalRoutes } from '@shared/routes.enum';

@Component({
  selector: 'app-similar-character',
  imports: [CommonModule, CardComponent, RouterModule],
  templateUrl: './similar-character.component.html',
  styleUrl: './similar-character.component.sass',
})
export class SimilarCharacterComponent implements OnInit {
  private charService = inject(CharacterService);

  char = input.required<Character>();

  suggestedChars = signal<CharactersDto | null>(null);

  detailRoute = `/${globalRoutes.CHAR_LIST}`;

  ngOnInit(): void {
    const { gender, status } = this.char();
    this.charService
      .searchCharacters({
        gender,
        status,
      })
      .subscribe((response) => this.suggestedChars.set(response));
  }
}
