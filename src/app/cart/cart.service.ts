import { Injectable } from '@angular/core';
import { Book } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  books: Book[] = [];

  addToCart(book: Book): void {
    this.books.push(book);
  }

  removeFromCart(book: Book): void {
    this.books.splice(this.books.indexOf(book), 1);
  }

  clearCart(): Book[] {
    this.books = [];
    return this.books;
  }
}
