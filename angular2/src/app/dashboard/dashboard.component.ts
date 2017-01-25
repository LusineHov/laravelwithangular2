import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Card }                from '../_models/card';
import { CardService } from '../_services/card.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	model: any = {};
	cards: Card[] = [];

  	constructor(private cardService: CardService,
  		private router: Router) { }

  	ngOnInit() {
  		this.cardService
	        .getAll()
	        .then(cards => this.cards = cards);
  	}
  	getCards(): void {
	    this.cardService
	        .getAll()
	        .then(cards => this.cards = cards);
	}

	delete(card: Card): void {
		if(localStorage.getItem("currentUser") == `"${card.user_id}"`){
	    	this.cardService
		        .delete(card.id)
		        .then(() => {
		          this.cards = this.cards.filter(c => c !== card)
		        });
		}
		
  	}

  	add(): void {
  		this.model.user_id = parseInt(localStorage.getItem("currentUser").slice(1));
	    this.cardService.create(this.model)
	      .then(card => {
	        this.cards.push(card);
	    });
	}

}