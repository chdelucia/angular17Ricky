import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { Observable, distinctUntilChanged, take, skip } from 'rxjs';
import { FilterNameComponent } from '@shared/components/filter-name/filter-name.component';
import { CharacterListComponent } from '@characters-feature/pages';
import { CharactersDto } from '@characters-data/models';
import { CharacterService } from '@characters-data/services/character.service';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { Store } from '@ngrx/store';
import {
  CharState,
  addTextAndPage,
  selectCharState,
} from '@characters-data/state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FilterNameComponent,
    CharacterListComponent,
    PaginationComponent,
    LoaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  @Input() name = '';

  @Input() page = '1';

  charactersResponse!: CharactersDto;

  noResult = false;

  state$!: Observable<CharState>;

  constructor(
    private characterService: CharacterService,
    private store: Store,
    private cdr: ChangeDetectorRef,
  ) {
    this.state$ = this.store.select(selectCharState);

    this.state$
      .pipe(distinctUntilChanged(), takeUntilDestroyed(), skip(2))
      .subscribe((response) => {
        this.getCharacters(response.textSearch, response.currentPage);
      });
  }

  ngOnInit(): void {
    const page = this.page ? parseInt(this.page) : 1;
    this.getCharacters(this.name, page);
    if (page || this.name) {
      this.store.dispatch(
        addTextAndPage({ textSearch: this.name ?? '', currentPage: page ?? 1 }),
      );
    }
  }

  private getCharacters(query: string, pagination: number) {
    this.characterService
      .searchCharacters(query, pagination)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.noResult = false;
          this.charactersResponse = response;
          this.cdr.markForCheck();
        },
        error: () => {
          //TODO manegar cuando el usuario se inventa la page o el name
          this.noResult = true;
          this.cdr.markForCheck();
        },
      });
  }
}
