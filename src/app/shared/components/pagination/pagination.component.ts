import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagination } from '../../../characters/data-access/models/pagination.model';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnChanges {
  @Input({required: true}) info!: Pagination;

  @Output() pagination = new EventEmitter<string>();

  currentIndex = 1;

  ngOnChanges(changes: SimpleChanges): void {
    const { previousValue, currentValue } = changes['info']
    if(previousValue && previousValue.count !== currentValue.count) {
      this.currentIndex = 1;
    }
  }

  emitPage(page: number): void {
    this.updatePageIndex(page)
    const url= this.getUrl(page);
    this.pagination.emit(url);
  }

  private updatePageIndex(value: number): void {
    this.currentIndex = value;
  }

  private getUrl(pageIndex: number) :string {
    let url = this.info.next ?? this.info.prev
    const regex = /page=\d+\b/;
    url = url!.replace(regex, `page=${pageIndex}`);
    return url!;
  }

}
