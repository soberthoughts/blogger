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

  // controlla il behavior del login
  // e aggiorna il nome utente
  ngOnInit(): void {
    this.auth.loggedInUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.username = user ? user.username : '';
    }
    );
  }

  // Metodo per il logout
  logOut(): void {
    this.auth.logout();
  }

}
