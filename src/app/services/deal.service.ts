import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { User } from '../models/user';
import { Deal } from '../models/deal';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Token } from '../models/token';

@Injectable()
export class DealService {

  token: Token = null;
  private dealUrl = 'http://localhost:8000/api/deals/';  // URL to web api
  private dealSearchUrl = 'http://localhost:8000/api/deals?search=';

  constructor(private http: Http) { }

/*  create(user: User, book_id: number, seller: boolean): Observable<Deal> {
    let token = JSON.parse(localStorage.getItem('token'));
    let headers = new Headers({
      'Authorization': 'Token ' + token,
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    const deal = new Deal(user.email, book_id, seller);
    console.log(deal);
    return this.http.post(this.dealUrl, deal, options)
      .map(this.extractData)
      .catch(this.handleError);
  }*/

  create(user: User, book_id: number, seller: boolean): Promise<any> {
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = new Headers({
      'Authorization': 'Token ' + token,
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });
    const deal = new Deal(user.email, book_id, seller);
    console.log(deal);
    return this.http.post(this.dealUrl, deal, options).toPromise().then(response => {return response; })
      .catch(this.handleError);
  }

  getDeals(): Promise<Deal[]> {
    const token = JSON.parse(localStorage.getItem('token'));
    const utente = JSON.parse(localStorage.getItem('currentUser')) as User;
    const headers = new Headers({ 'Authorization': 'Token ' + token });
    const options = new RequestOptions({ headers: headers });
    const url = `${this.dealSearchUrl}${utente.email}`;
    return this.http.get(url, options)
      .toPromise()
      .then(response => {
        console.log(response.json());
        return response.json() as Deal[];
      })
      .catch(this.handleError);
  }

 delete(id: number): Promise<void> {
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = new Headers({ 'Authorization': 'Token ' + token });
    const options = new RequestOptions({ headers: headers });
    const url = `${this.dealUrl}${id}`;
    return this.http.delete(url, options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    console.log(body);
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
