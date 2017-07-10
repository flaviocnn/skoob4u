import { Component, OnInit } from '@angular/core';
import { Deal } from '../models/deal';
import { DealService } from '../services/deal.service';
import { User } from '../models/user';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [BookService],
})
export class DashboardComponent implements OnInit {
  dealsSelling: Deal[] = [];
  dealsBuying: Deal[] = [];
  currentUser: User = null;
  subscription: Subscription;
  bookIsbns: [number, string] = [null, null];
  booksDict: [number, string] = [null, null];

  constructor(
    private dealService: DealService,
    private messageService: MessageService,
    private bookService: BookService,
  ) {}

  ngOnInit(): void {

    this.subscription = this.messageService.subject.subscribe({
      next: (User) => this.currentUser = User
    })
    this.dealService.getDeals()
      .then(deals => this.filterDeals(deals));
  }

  filterDeals(deals: Deal[]) {

    deals.forEach(element => {
      if (element.is_buyer) {
        this.dealsBuying.push(element);
      }else {this.dealsSelling.push(element); }
    });
  }
  getImages() {
    console.log(this.bookIsbns);
    this.bookIsbns.slice(2,).forEach(element => {
      console.log(element);
      this.bookService.getBook(element[2]).then(book => this.booksDict.push(element[0],book.img_url));
    });

    console.log(this.booksDict);
  }

  delete(deal: Deal): void {
    this.dealService
        .delete(deal.id)
        .then(() => {
          this.dealsBuying = this.dealsBuying.filter(h => h !== deal);
          this.dealsSelling = this.dealsSelling.filter(h => h !== deal);
        });
  }
}
