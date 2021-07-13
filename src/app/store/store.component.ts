import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoreService, Book, BookInfo } from './store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();
  books: Book[] = [];
  bookInfo!: BookInfo;
  search: string = '';
  columnName!: string;
  sortOrder!: 'asc' | 'desc';
  shoppingCart: string[] = [];
  showInfo: boolean = false;
  showCart: boolean = false;

  constructor(
    private http: HttpClient,
    private storeService: StoreService,
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

  showBookInfo(isbn: string): void {
    this.storeService.getBook(isbn)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (bookInfo) => {
          this.bookInfo = bookInfo;
          this.showInfo = true;
        },
        (error) => alert(error.message));
  }

  onSortOrder(columnName: string): void {
    this.columnName = columnName;
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
  }

  addBookToCart(book: Book): void {
    this.shoppingCart.push(book.title);
  }

  removeBookFromCart(book: string): void {
    this.shoppingCart.splice(this.shoppingCart.indexOf(book), 1);
  }

  showShoppingCart(): void {
    this.showCart = true;
  }

  closeModal(state: boolean): void {
    this.showInfo = state;
    this.showCart = state;
  }
}
