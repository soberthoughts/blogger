import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog-app';

  constructor(private auth: AuthService) { }

  // Metodo per il logout
  logOut(): void {
    this.auth.logout();
  }
}
