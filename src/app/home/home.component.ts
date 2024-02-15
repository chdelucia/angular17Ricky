import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, distinctUntilChanged, take, skip } from 'rxjs';
import { CharacterListComponent } from '@characters-feature/pages';
import { CharactersDto } from '@characters-data/models';
import { CharacterService } from '@characters-data/services/character.service';
import {
  LoaderComponent,
  PaginationComponent,
  FilterNameComponent,
  NoResultsComponent,
} from '@shared/components';
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
    NoResultsComponent,
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
    const name = this.name ?? '';

    this.getCharacters(name, page);
    this.updateState(name, page);
  }

  private updateState(name: string, page: number): void {
    this.store.dispatch(
      addTextAndPage({ textSearch: name, currentPage: page }),
    );
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
          //TODO manejar cuando el usuario se inventa la page o el name
          this.noResult = true;
          this.cdr.markForCheck();
        },
      });
  }
}
