import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Card }                from '../_models/card';
import { CardService } from '../_services/card.service';
import { Location }               from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
	moduleId: module.id,
  	selector: 'app-card',
  	templateUrl: './card.component.html',
  	styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
	card: Card;

  	constructor(private cardService: CardService,
  		private route: ActivatedRoute,
  		private router: Router,
  		private location: Location ) { }

	ngOnInit() {
    	this.route.params
      		.switchMap((params: Params) => this.cardService.getCard(+params['id']))
      		.subscribe(card => this.card = card);
	}

	save(): void {
		if(localStorage.getItem("currentUser") == `"${this.card.user_id}"`){
		    this.cardService.update(this.card)
		    	.then(() => this.goBack());
	    }
	}

	goBack(): void {
	    this.location.back();
	}
}
