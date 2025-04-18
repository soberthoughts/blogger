import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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

  constructor(private router: Router, private http: HttpClient) {}

  //restituisce l'utente loggato
  login(username: string, password: string, rememberMe: boolean): Observable<any> {
    console.log('Login attempt.');
    return this.http.post<{ token: string }>('http://localhost:5088/api/auth/login', {
      username,
      password
    }).pipe(
      tap(response => {
        if (rememberMe) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        } else {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('user', JSON.stringify(response.user));
        }
  
        // Trova l'utente localmente
        const user = this.users.find(u => u.username === username);
        if (user) {
          this.loggedInUser = user;
          this.loggedInUserSubject.next(user);
        }
      })
    );
  }  
  

  //se l'utente è loggato, lo disconnettiamo
  logout(): void {
    this.loggedInUser = null;
    this.loggedInUserSubject.next(null);

    // Rimuovi il token e l'utente da localStorage o sessionStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');

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
