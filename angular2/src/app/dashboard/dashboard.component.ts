import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Card } from '../_models/card';
import { CardService } from '../_services/card.service';
import { SocketsService } from '../_services/sockets.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FilterPipe } from '../filter.pipe';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [FilterPipe]
})
export class DashboardComponent implements OnInit, OnDestroy {
	private searchTerms = new Subject<string>();
	private items: Observable<Array<string>>;
	private errorMessage: string;
	private errormessage: string;
	private errorMessageforCreate: string;
	private errorMessageforDelete: string;
	private MessageforDelete: string;
	private model: any = {};
	private modal: any = {};
	private cards: Card[] = [];
	private categories: any = [];
	private connection;
	private messages:any = {};
	private posts:any = [];

  	constructor(private cardService: CardService,
  		private socketsService: SocketsService,
  		private authenticationService: AuthenticationService,
  		private router: Router) { }

  	private search(term: string): void {
	    this.searchTerms.next(term);
	}

  	ngOnInit() {  	
  		this.connection = this.socketsService.getCards().subscribe(post => {
	        this.messages = post;
	        this.posts = this.messages.post;
	    });

  		this.items = this.searchTerms
		    .debounceTime(300)        
		    .distinctUntilChanged()   
		    .switchMap(term => this.cardService.search(term));
		   
		// this.cardService.getAllUsers() 
		// 	.subscribe(
  //               data => {
  //                   console.log(data) 
  //               },
  //               error => {
  //               	this.errorMessage = <any>error;
  //               }); 
  		this.cardService.getAll()
	        .subscribe(
                data => {
                    this.cards = data
                },
                error => {
                	this.errorMessage = <any>error;
                });
	    this.cardService.create()
	        .subscribe(
                data => {
                    this.categories = data;
                },
                error => {
                	this.errormessage = <any>error;
                });
	    
  	}

	private delete(card: Card): void {
    	this.cardService.delete(card.id)
	        .subscribe(
		      	data => {
		      		this.MessageforDelete = <any>data.message;
		      		console.log(this.MessageforDelete);
		      		this.cardService.getAll()
				        .subscribe(
			                data => {
			                    this.cards = data
			                },
			                error => {
			                	this.errorMessage = <any>error;
			                });
		      	},
		      	error => {
		      		this.errorMessageforDelete = <any>error.message;
		      	});		
  	}

  	private add(): void {
	    this.cardService.store(this.model)
	      	.subscribe(
		      	data => {
		      		this.cardService.getAll()
				        .subscribe(
			                data => {
			                    this.cards = data
			                },
			                error => {
			                	this.errorMessage = <any>error;
			                });
		      	},
		      	error => {
		      		this.errorMessageforCreate = <any>error;
		      	});
	}

	private logout(): void {
	    this.authenticationService.logout()
	      	.subscribe(
		      	data => {
	        		localStorage.removeItem('currentUser');
	        		this.router.navigate(['./login']);
		      	},
		      	error => {
		      		console.log(error)
		      	});
	}

	ngOnDestroy() {
	    this.connection.unsubscribe();
	}

}
