import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    // login(username: string, password: string) {
    //     return this.http.post('http://angular.dev/api/login')
    //         .map((response: Response) => {
    //             let user = response.json();
    //             for( var i=0; i<user.data.length; i++ ){
    //                 if(username == user.data[i].username && password == user.data[i].password){
    //                     localStorage.setItem('currentUser', JSON.stringify(user.data[i].id))
    //                     // console.log(localStorage.getItem('currentUser'));
    //                 }
                    
    //             }
    //         });
    // }

    login(email: string, password: string) {
        return this.http.post('http://angular.dev/api/login', { email: email, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                localStorage.setItem('currentUser', JSON.stringify(user))
                    
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}