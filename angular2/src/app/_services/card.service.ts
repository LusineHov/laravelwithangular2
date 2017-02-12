import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Card } from '../_models/card';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class CardService {
    private cardsUrl = 'http://angular.dev/api/posts';

    constructor(private jsonp: Jsonp, private http: Http) { }

    getAll() {
        return this.http.get(this.cardsUrl, this.jwt())
        .map((response: Response) => response.json().posts)
        .catch(this.handleError);
    }

    create() {
        const url = `${this.cardsUrl}/create`;
        return this.http.get(url, this.jwt())
        .map((response: Response) => response.json().categories)
        .catch(this.handleError);
    }

    delete(id: number) {
        const url = `${this.cardsUrl}/${id}`;
        return this.http.delete(url, this.jwt())
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

    store(card: Card) {
        return this.http.post(this.cardsUrl, card, this.jwt())
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

    // getCard(id: number){
    //     const url = `${this.cardsUrl}/${id}`;
    //     return this.http.get(url, this.jwt())
    //     .map((response: Response) => response.json().post)
    //     .catch(this.handleError);
    // }
    show(id: number) {
        const url = `${this.cardsUrl}/${id}/edit`;
        return this.http.get(url, this.jwt())
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

    update(card: Card) {
        const url = `${this.cardsUrl}/${card.id}`;
        return this.http.put(url, card, this.jwt())
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

    search(input: any) {
        return this.http.post('http://angular.dev/api/search', {term:input}, this.jwt())
        .map((response: Response) => response.json().posts)
        .catch(this.handleError);
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(error.json());
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.api_token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.api_token });
            return new RequestOptions({ headers: headers });
        }
    }
}