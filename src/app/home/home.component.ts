import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from '@characters/character-list/character-list.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { CharactersDto } from '../characters/data-access/models/characters-dto';
import { CharacterService } from '../characters/data-access/character.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap, take } from 'rxjs';
import { FilterNameComponent } from '@shared/components/filter-name/filter-name.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FilterNameComponent,
    CharacterListComponent,
    PaginationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent implements OnInit {

  charactersResponse!: CharactersDto;

  noResult = false;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.getCharacters('', 1);
  }

  onPagination(query: string): void {
    this.getCharacters(query)
  }

  filterByName(text: string) {
    this.getCharacters(text, 1)
  }

  private getCharacters(query: string, pagination?: number) {
    this.characterService.searchCharacters(query, pagination)
    .pipe(take(1))
    .subscribe({
      next : (response) =>  {
        this.noResult = false;
        this.charactersResponse = response;
      },
      error : () => this.noResult = true
    });
  }


}
