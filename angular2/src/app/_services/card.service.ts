import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import 'rxjs/add/operator/toPromise';
import { Card } from '../_models/card';

@Injectable()
export class CardService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private cardsUrl = 'api/cards';

    constructor(private http: Http) { }

    getAll(): Promise<Card[]> {
        return this.http.get(this.cardsUrl)
           .toPromise()
           .then(response => response.json().data as Card[])
           .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.cardsUrl}/${id}`;
            return this.http.delete(url, {headers: this.headers})
                .toPromise()
                .then(() => null)
                .catch(this.handleError);
    }

    create(card: Card): Promise<Card> {
        return this.http
            .post(this.cardsUrl, JSON.stringify( card ), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    getCard(id: number): Promise<Card> {
        const url = `${this.cardsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Card)
            .catch(this.handleError);
    }

    update(card: Card): Promise<Card> {
        const url = `${this.cardsUrl}/${card.id}`;
        return this.http
            .put(url, JSON.stringify(card), {headers: this.headers})
            .toPromise()
            .then(() => card)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}