import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shared-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {}
