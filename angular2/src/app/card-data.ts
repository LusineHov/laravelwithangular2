import { InMemoryDbService } from 'angular-in-memory-web-api';
 
export class CardData implements InMemoryDbService {
  createDb() {
    let cards = [
      { id: '1', user_id: '1', title: 'nature',  date: '01/01/2017', type: 'nature' }
    ];
    return {cards};
  }
}