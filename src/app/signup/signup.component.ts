import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';

import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';

import { Signup } from '../models/signup';
import { User } from '../models/user';

@Component({
  selector: 'signup-comp',
  templateUrl: './signup.component.html',
  styleUrls: ['../home/home.component.css'],

})
export class SignupComponent {

  @ViewChild('signupForm') form: NgForm;
  model = new Signup('', '');
  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  onSubmit() {
    if (this.form.valid) {
      console.log("Form Submitted!");
      console.log(this.model);
      this.register(this.model.email, this.model.password);
    }
  }

  register(mail: string, pass: string) {
    this.userService.create2(new Signup(mail, pass))
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        this.alertService.success('Registration successful', true),
          this.saveUser(data),
          this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error(error);
      });
  }

  saveUser(user: User) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    //console.log(JSON.parse(localStorage.getItem("currentUser")));
  }
  /*register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        this.alertService.success('Registration successful', true);
        this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }*/
}
