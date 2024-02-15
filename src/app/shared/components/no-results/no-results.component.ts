import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shared-no-results',
  standalone: true,
  imports: [],
  templateUrl: './no-results.component.html',
  styleUrl: './no-results.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoResultsComponent {}
