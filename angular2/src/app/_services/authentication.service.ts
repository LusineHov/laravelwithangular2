import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(email: string, password: string) {
        return this.http.post('http://angular.dev/api/login', { email: email, password: password })
        .map((response: Response) => {
            let user = response.json();
            if (user && user.api_token) {
                localStorage.setItem('currentUser', JSON.stringify(user))
            }        
        })
        .catch(this.handleError);
    }

    logout() {
        return this.http.get('http://angular.dev/api/logout', this.jwt())
        .map((response: Response) => { 
        })
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