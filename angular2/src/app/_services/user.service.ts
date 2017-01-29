import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from '../_models/user';

@Injectable()
export class UserService {

    private headers = new Headers({ "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "POST",
            "Access-Control-Allow-Headers": "X-Custom-Header"});
    private usersUrl = 'api/users';

    constructor(private http: Http) { }

    // getAll(): Promise<User[]> {
    //     return this.http.get(this.usersUrl)
    //        .toPromise()
    //        .then(response => response.json().data as User[])
    //        .catch(this.handleError);
    // }
    create(user: User) {
        return this.http.post('http://angular.dev/api/register', user).map((response: Response) => response.json());
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser)
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}