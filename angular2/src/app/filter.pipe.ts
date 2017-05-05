import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {

	transform(cards: any, term: any): any {
		switch(term) {
			case 'title':
				var titles = [];
			  	for (var i = 0; i< cards.length; i++){
			  		titles.push(cards[i].title)
			  	}
				titles = titles.sort();
				var sortedcards = [];
				for (var j=0; j<titles.length; j++){
					for (var k=0; k<cards.length; k++){
						if(cards[k].title == titles[j]){
							sortedcards.push(cards[k]);
						}				
					}
				}
				return sortedcards;  
			default:
				return cards; 
		} 
	}
}