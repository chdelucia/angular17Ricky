import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { Observable, distinctUntilChanged, take } from 'rxjs';
import { FilterNameComponent } from '@shared/components/filter-name/filter-name.component';
import { CharacterListComponent } from '@characters-feature/character-list/character-list.component';
import { CharactersDto } from '@characters-data/models';
import { CharacterService } from '@characters-data/character.service';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { Store } from '@ngrx/store';
import { CharState, selectCharState } from '@characters-data/state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


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
  styleUrl: './home.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  charactersResponse!: CharactersDto;

  noResult = false;

  state$!: Observable<CharState>;

  constructor(
    private characterService: CharacterService,
    private store: Store,
    private cdr: ChangeDetectorRef,
  ) {
    this.state$ = this.store.select(selectCharState)

    this.state$
    .pipe(
      distinctUntilChanged(),
      takeUntilDestroyed()
    )
    .subscribe(response => {
      this.getCharacters(response.textSearch, response.currentPage)
      }
    )
  }


  private getCharacters(query: string, pagination: number) {
    this.characterService.searchCharacters(query, pagination)
    .pipe(take(1))
    .subscribe({
      next : (response) =>  {
        this.noResult = false;
        this.charactersResponse = response;

        this.cdr.markForCheck();
      },
      error : () => this.noResult = true
    });
  }


}
