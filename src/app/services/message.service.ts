import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MessageService {

  user: User = null;
  subject = new BehaviorSubject(this.user);

  setUser(user: User) {
    console.log('setting user...')
    try {
      console.log(user);
      this.subject.next(user);
    } catch (error) {
      console.log(error);
      this.subject.next(null);
    }
  }

  unsetUser(){
    console.log("Current user era' " + this.subject);
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentUser');
    this.subject.next(null);
  }

  clearMessage() {
    //this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
