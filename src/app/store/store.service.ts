import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private corsURL = 'https://cors-server-proxy.herokuapp.com/';
  private apiURL = 'https://api.itbook.store/1.0';

  constructor(private http: HttpClient) { }

  fetchBooks(): Observable<any> {
    return this.http.get<any>(`${this.corsURL}${this.apiURL}/new`);
  }

  getBook(isbn: string): Observable<BookInfo> {
    return this.http.get<BookInfo>(`${this.corsURL}${this.apiURL}/books/${isbn}`);
  }
}

export interface Book {
  title: string,
  subtitle?: string,
  isbn13: string,
  price: string,
  image: string
}

export interface BookInfo {
  authors: string,
  publisher: string,
  year: string,
  pages: string,
  language: string,
  url: string
}
