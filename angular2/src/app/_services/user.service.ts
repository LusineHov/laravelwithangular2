import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { User } from '../_models/user';

@Injectable()
export class UserService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private usersUrl = 'api/users';

    constructor(private http: Http) { }

    getAll(): Promise<User[]> {
        return this.http.get(this.usersUrl)
           .toPromise()
           .then(response => response.json().data as User[])
           .catch(this.handleError);
    }

    create(user: User): Promise<User> {
        return this.http
        .post(this.usersUrl, JSON.stringify( user ), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}