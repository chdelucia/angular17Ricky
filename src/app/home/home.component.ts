import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { take } from 'rxjs';
import { FilterNameComponent } from '@shared/components/filter-name/filter-name.component';
import { CharacterListComponent } from '@characters-feature/character-list/character-list.component';
import { CharactersDto } from '@characters-data/models';
import { CharacterService } from '@characters-data/character.service';
import { LoaderComponent } from '@shared/components/loader/loader.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FilterNameComponent,
    CharacterListComponent,
    PaginationComponent,
    LoaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent implements OnInit {

  charactersResponse!: CharactersDto;

  noResult = false;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    const { prevInfo } = this.characterService;
    if(prevInfo) {
      this.charactersResponse = prevInfo;
    } else {
      this.filterByName('');
    }
  }

  onPagination(nextUrl: string): void {
    this.getCharacters(nextUrl);
  }

  filterByName(text: string) {
    const page = 1;
    this.getCharacters(text, page);
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
