import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  username = '';
  title = 'blog-app';
  isLoggedIn = false;

  constructor(private auth: AuthService) { }
  ngOnInit(): void {
    // Controlla se c'è un utente salvato in memoria
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');

    if (userData) {
      const user = JSON.parse(userData);
      this.isLoggedIn = true;
      this.username = user.username;

      // aggiorna anche il BehaviorSubject (facoltativo ma utile)
      this.auth.loggedInUserSubject.next(user);
    }

    // Rimani sincronizzato nel caso cambi l’utente loggato durante l’uso
    this.auth.loggedInUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.username = user ? user.username : '';
    });
  }

  logOut(): void {
    this.isLoggedIn = false;
    // Chiama il metodo di logout del servizio AuthService
    this.auth.logout();
  }
}
