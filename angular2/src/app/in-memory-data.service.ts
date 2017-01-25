import { InMemoryDbService } from 'angular-in-memory-web-api';
 
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let users = [
      { id: '2', username: 'Lusine', password: 'Lusine' },
      { id: '3', username: 'Bombasto', password: 'Bombasto' },
    ];
    let cards = [
      { id: '11', user_id: '3', title: 'flowers',  date: '01/01/2017', type: 'nature' },
      { id: '12', user_id: '2', title: 'earth',  date: '03/01/2017', type: 'nature' },
    ];
    return {users, cards};
  }
}