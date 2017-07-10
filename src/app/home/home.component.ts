import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { AuthenticationService } from '../services/authentication.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../services/message.service';

import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BookService,],

})

export class HomeComponent implements OnInit {
  books: Observable<Book[]>;
  private searchTerms = new Subject<string>();

  constructor(private bookService: BookService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.books = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term  // switch to new observable each time the term changes
        // return the http search observable
        ? this.bookService.search(term)
        // or the observable of empty books if there was no search term
        : Observable.of<Book[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Book[]>([]);
      });
  }
  gotoDetail(book: Book): void {
    let link = ['/detail', book.isbn];
    this.router.navigate(link);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
