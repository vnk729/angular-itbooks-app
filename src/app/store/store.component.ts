import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreService, Book, BookInfo } from './store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
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

  fetchBooks() {
    this.storeService.fetchBooks().subscribe(({ books }) => {
      this.books = books;
    });
  }

  getBook(isbn: string, content: any) {
    this.storeService.getBook(isbn).subscribe((bookInfo) => {
      this.bookInfo = bookInfo;
      this.modalService.open(content);
    });
  }

  onSortOrder(columnName: string) {
    this.columnName = columnName;
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
  }
}
