import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Card } from '../_models/card';
import { CardService } from '../_services/card.service';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
	moduleId: module.id,
  	selector: 'app-card',
  	templateUrl: './card.component.html',
  	styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
	card: Card;
	errorMessage: string;
	errorMessageforUpdate: string;
	categoryname: number;
	categories: any = [];

  	constructor(private cardService: CardService,
  		private route: ActivatedRoute,
  		private router: Router,
  		private location: Location ) { }

	ngOnInit() {
    	this.route.params
      		.switchMap((params: Params) => this.cardService.show(+params['id']))
      		.subscribe(
      			data => {
      				this.card = <any>data.post;
      				if(this.card == undefined){
      					this.goBack();
      				} 
      				this.categoryname = data.categoryname;               
      				this.categories = data.categories;               
      				console.log(data);
      			},
      			error => {
      				this.errorMessage = <any>error;
      			});
	}

	save(): void {
		this.card.category_id = this.categoryname;
	    this.cardService.update(this.card)
	    	.subscribe(
                data => {
                    this.goBack();
                },
                error => {
                	this.errorMessageforUpdate = <any>error;
                });
	}

	goBack(): void {
	    this.location.back();
	}
}