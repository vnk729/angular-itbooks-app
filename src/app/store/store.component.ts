import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreService, Book, BookInfo } from './store.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.fetchBooks();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  fetchBooks() {
    this.storeService.fetchBooks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        ({ books }) => {
          this.books = books;
        },
        (error) => alert(error.message));
  }

  getBook(isbn: string, content: any) {
    this.storeService.getBook(isbn)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (bookInfo) => {
          this.bookInfo = bookInfo;
          this.modalService.open(content);
        },
        (error) => alert(error.message));
  }

  onSortOrder(columnName: string) {
    this.columnName = columnName;
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
  }
}
