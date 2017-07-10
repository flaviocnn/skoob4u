import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {

  private loginUrl = 'http://localhost:8000/api/login/';

  constructor(private http: Http, ) {}

  login(email: string, password: string) {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const datajson = JSON.stringify({ username: email, password: password });

    return this.http.post(this.loginUrl, datajson, options)
            .map((response: Response) => {
                console.log(response.json());
                // login successful if there's a jwt token in the response
                const token = response.json()['token'];
                const user = response.json()['user'] as User;

                if (user && token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('token', JSON.stringify(token));
                }
                return user;
            });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    //this.messageService.setUser();
  }

}
