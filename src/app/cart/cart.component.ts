import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  @Input() shoppingCart: string[] = [];
  @Input() showCart: boolean = true;
  @Output() isShowCart: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  removeBookFromCart(book: string): void {
    this.shoppingCart.splice(this.shoppingCart.indexOf(book), 1);
  }

  close(): void {
    this.showCart = false;
    this.isShowCart.emit(this.showCart);
  }
}
