import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  @Input() shoppingCart!: string[];
  @Output() isShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  remove(book: string): void {
    this.shoppingCart.splice(this.shoppingCart.indexOf(book), 1);
  }

  close(): void {
    this.isShow.emit(false);
  }
}
