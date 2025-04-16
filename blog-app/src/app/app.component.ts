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
    const user = this.auth.getCurrentUser();
    console.log(user);
    if (user) {
      this.isLoggedIn = true;
      this.username = user.name;
    } else {
      this.isLoggedIn = false;
    }
  }

  // Metodo per il logout
  logOut(): void {
    this.auth.logout();
  }

}
