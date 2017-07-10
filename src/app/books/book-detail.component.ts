import 'rxjs/add/operator/switchMap';
import { Component, OnInit,EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../models/user';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../services/message.service';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { Deal } from '../models/deal';
import { DealService } from '../services/deal.service';
import {MaterializeAction} from 'angular2-materialize';
import * as Materialize from "angular2-materialize";

@Component({
  selector: 'book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  providers: [BookService, DealService],
})
export class BookDetailComponent implements OnInit {

  modalActions = new EventEmitter<string|MaterializeAction>();
  book: Book;
  public currentUser: User;
  public dealer: string = null;
  subscription: Subscription;

  constructor(
    private dealService: DealService,
    private messageService: MessageService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.subscription = messageService.subject.subscribe({
      next: (User) => this.currentUser = User});
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.bookService.getBook(+params['isbn']))
      .subscribe(book => this.book = book);
  }

  sell() {
    Materialize.toast(`Ti sto registrando come venditore...`, 1000);
    this.addDeal(true);
  }

  buy() {
    Materialize.toast(`Ti sto registrando come acquirente...`, 1000);
    this.addDeal(false);
  }

  addDeal(seller: boolean){
     this.dealService
        .create(this.currentUser, this.book.isbn, seller)
        .then(data => {
        // set success
        if (data.status === 202) {
          this.dealer = (data.json())['user'];
          this.openModal();
        } else {
          Materialize.toast(`Sottoscritto con successo!`, 3000);
        }
      },
      error => {
      });
  }
  save(): void {
    this.bookService.update(this.book)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  openModal() {
    this.modalActions.emit({action: "modal", params: ['open']});
  }
  closeModal() {
    this.modalActions.emit({action: "modal", params: ['close']});
  }
}
