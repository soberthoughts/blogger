import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface User {
  id: number;
  username: string;
  password: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //utenti hardcoded
  private users: User[] = [
    {id: 1, username: 'kristirpj', password: 'admin.1', name: 'Kristi Rrapaj'},
    {id: 2, username: 'mariorss', password: 'user.1', name: 'Mario Rossi'},
    {id: 3, username: 'giovannib', password: 'user.2', name: 'Giovanni Bini'},
    {id: 4, username: 'lucab', password: 'user.3', name: 'Luca Bianchi'},
    {id: 5, username: 'andreap', password: 'user.4', name: 'Andrea Pavan'}
  ];

  //utente loggato
  private loggedInUser: User | null = null;

  //comportamento dell'utente loggato
  private loggedInUserSubject = new BehaviorSubject<User | null>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor(private router: Router) {}

  //restituisce l'utente loggato
  login(username: string, password: string): boolean {
    const foundUser = this.users.find(user => user.username === username && user.password === password);
    //se l'utente è stato trovato, lo memorizziamo
    if (foundUser) {
      this.loggedInUser = foundUser;
      this.loggedInUserSubject.next(this.loggedInUser);
      return true;
    }

    return false;
  }

  //se l'utente è loggato, lo disconnettiamo
  logout(): void {
    this.loggedInUser = null;
    this.loggedInUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  //restituisce true se l'utente è loggato, false altrimenti
  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  //restituisce l'utente loggato
  getCurrentUser(): User | null {
    return this.loggedInUser;
  }

  //restituisce l'utente in base all'id
  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

}
