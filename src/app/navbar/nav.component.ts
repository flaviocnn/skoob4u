import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/user';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-comp',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  public currentUser: User;
  subscription: Subscription;

  constructor(
    private messageService: MessageService,
    private router: Router, ) {
  }

  ngOnInit() {

    this.subscription = this.messageService.subject.subscribe({
      next: (User) => this.currentUser = User
    });
  }
  quit() {
    console.log("performing logout...");
    this.messageService.unsetUser();
    this.router.navigate(['/home']);
  }

}
