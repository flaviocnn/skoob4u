import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { Signup } from '../models/signup';
import { User } from '../models/user';
import { MessageService } from '../services/message.service';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['../home/home.component.css'],
})

export class LoginComponent implements OnInit {

  @ViewChild('loginForm') form: NgForm;
  model = new Signup('', '');
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  onSubmit() {
    console.log(this.model);
    this.login(this.model);
  }

  login(user: Signup) {
      // getting user
      this.authenticationService.login(user.email, user.password)
        .subscribe(
        res => {
          this.messageService.setUser(res);
          this.router.navigate(['/home']);
        },
        error => {
          console.log('error is ' + error);
          this.alertService.error(error);
        });

    }

  /*login(user: Signup) {
    //getting token
    this.authenticationService.login(user.email, user.password)
      .subscribe(
      data => {
        console.log('data is ' + JSON.stringify(data));
//getting user
        this.userService.getByEmail(user.email, data.token).subscribe(
          res => {
            this.messageService.setUser();
          }, error => { });
      },
      error => {
        console.log('error is ' + error);
        this.alertService.error(error);
      });
      this.router.navigate(['/home']);
  }*/
}
