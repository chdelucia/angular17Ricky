import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from '@characters/character-list/character-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CharacterListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
