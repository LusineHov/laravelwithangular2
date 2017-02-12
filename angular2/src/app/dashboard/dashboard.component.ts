import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Card } from '../_models/card';
import { CardService } from '../_services/card.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	private searchTerms = new Subject<string>();
	items: Observable<Array<string>>;
	errorMessage: string;
	errormessage: string;
	errorMessageforCreate: string;
	errorMessageforDelete: string;
	MessageforDelete: string;
	model: any = {};
	modal: any = {};
	cards: Card[] = [];
	categories: any = [];

  	constructor(private cardService: CardService,
  		private authenticationService: AuthenticationService,
  		private router: Router) { }

  	search(term: string): void {
	    this.searchTerms.next(term);
	}

  	ngOnInit() {  		
  		this.items = this.searchTerms
		    .debounceTime(300)        
		    .distinctUntilChanged()   
		    .switchMap(term => this.cardService.search(term));
		      
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

	delete(card: Card): void {
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

  	add(): void {
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

	logout(): void {
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

}
