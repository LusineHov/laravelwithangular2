import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.get('/api/users')
            .map((response: Response) => {
                let user = response.json();
                for( var i=0; i<user.data.length; i++ ){
                    if(username == user.data[i].username && password == user.data[i].password){
                        localStorage.setItem('currentUser', JSON.stringify(user.data[i].id))
                        // console.log(localStorage.getItem('currentUser'));
                    }
                    
                }
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}