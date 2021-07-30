import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Book, StoreService } from './store.service';
import { CartService } from '../cart/cart.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();
  books: Book[] = [];
  search: string = '';
  columnName!: string;
  sortOrder!: 'asc' | 'desc';

  constructor(
    private http: HttpClient,
    private storeService: StoreService,
    public cartService: CartService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  fetchBooks(): void {
    this.storeService.fetchBooks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        ({ books }) => {
          this.books = books;
        },
        (error) => alert(error.message));
  }

  addToCart(book: Book): void {
    this.cartService.addToCart(book);
  }

  removeFromCart(book: Book): void {
    this.cartService.removeFromCart(book);
  }

  onSortOrder(columnName: string): void {
    this.columnName = columnName;
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
  }
}
