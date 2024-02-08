import { ChangeDetectionStrategy, Component, Input, numberAttribute } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { CharacterService } from '../../data-access/character.service';
import { Character } from '../../data-access/models';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { globalRoutes } from '@shared/routes.enum';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterDetailComponent {
  @Input({ transform: numberAttribute }) id = 0;

  character$!: Observable<Character>;

  listRoute = `/${globalRoutes.HOME}`

  constructor(private characterService: CharacterService, private location:Location) { }

  ngOnInit(): void {
    this.character$ = this.characterService.getDetails(this.id);
  }

  onGoBack():void{
    this.location.back();
  }
}
