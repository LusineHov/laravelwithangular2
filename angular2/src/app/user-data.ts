import { InMemoryDbService } from 'angular-in-memory-web-api';
 
export class UserData implements InMemoryDbService {
  createDb() {
    let users = [
      { id: '1', username: 'Lusine', password: 'Lusine' },
      { id: '2', username: 'Bombasto', password: 'Bombasto' },
    ];
    return {users};
  }
}