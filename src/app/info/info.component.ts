import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookInfo } from '../store/store.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  @Input() bookInfo!: BookInfo;
  @Input() showCart: boolean = true;
  @Output() isShowCart: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  close(): void {
    this.showCart = false;
    this.isShowCart.emit(this.showCart);
  }
}
