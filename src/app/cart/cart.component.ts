import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { Book } from '../store/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(public cartService: CartService) { }

  removeFromCart(book: Book): void {
    this.cartService.removeFromCart(book);
  }
}
