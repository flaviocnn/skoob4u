import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Book } from '../models/book';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private booksUrl = 'http://localhost:8000/api/books/';
  private searchBookUrl = 'http://localhost:8000/api/books/?search=';

  constructor(private http: Http) { this.headers.append('Access-Control-Allow-Origin', '*') };

  getBooks(): Promise<Book[]> {
    return this.http.get(this.booksUrl)
      .toPromise()
      .then(response => {
        console.log(response.json());
        return response.json() as Book[];
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getBook(isbn: number): Promise<Book> {
    const url = `${this.booksUrl}${isbn}/`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log(response.json());
        return response.json() as Book;
      })
      .catch(this.handleError);
  }

  search(term: string): Observable<Book[]> {
    const url = `${this.searchBookUrl}${term}`;
    return this.http
      .get(url)
      .map(response => response.json() as Book[]);
  }
  update(book: Book): Promise<Book> {
    const url = `${this.booksUrl}${book.isbn}/`;
    return this.http
      .put(url, JSON.stringify(book), { headers: this.headers })
      .toPromise()
      .then(() => book)
      .catch(this.handleError);
  }

}
