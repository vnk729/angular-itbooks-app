import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookInfo } from '../store/store.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  @Input() bookInfo!: BookInfo;
  @Output() isShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  close(): void {
    this.isShow.emit(false);
  }
}
