import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../models/user';
import { Signup } from '../models/signup';

@Injectable()
export class UserService {

  private userUrl = 'http://localhost:8000/api/users/';
  constructor(private http: Http) { }

  getByEmail(email: string, token: string) {
    return this.http.get(this.userUrl + '?email=' + email, this.jwt(token))
    .map((response: Response) => {
      response.json();
      let user :User = response.json() as User;
      console.log(user);
      localStorage.setItem('currentUser',JSON.stringify(user));
    });
  }

  private jwt(token:string) {

    if (token) {
      let headers = new Headers({ 'Authorization': 'Token ' + token });
      return new RequestOptions({ headers: headers });
    }
  }

  create2(user: Signup): Observable<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.userUrl, { email: user.email, password: user.password }, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
