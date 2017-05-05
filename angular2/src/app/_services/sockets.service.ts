import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';

@Injectable()
export class SocketsService {
	private url = 'http://localhost:3000';  
    private socket;
    private currentUser:any;

    socketConnection(){
	    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));  
    	if (this.currentUser && this.currentUser.api_token) {  
		    this.socket = io(this.url, { query: "currentUserID="+this.currentUser.id });
		    var room = this.currentUser.id;
		    this.socket.emit('create', room);
		}
		return this.socket;
    }

    getCards() {
    	var sock = this.socketConnection();
	    let observable = new Observable(observer => {
	        sock.on('post', (data) => {
	            observer.next(data);    
	        }); 
	    })     
	    return observable;
	}  
}