import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: [ './books.component.css' ],
  providers: [BookService],
})
export class BooksComponent implements OnInit {
  books : Book[] ;
  constructor(private bookService : BookService,
  private router: Router) { }

  ngOnInit(): void {
    this.bookService.getBooks().then(books => this.books = books);
  }
}
