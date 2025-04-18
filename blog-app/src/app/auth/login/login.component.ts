import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

/* Interfaccia di login 
*Controlla se c'è un utente salvato in memoria
* Se c'è, lo reindirizza alla pagina dei post
* Se non c'è, mostra il form di login
*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  rememberMe: boolean = false;

  // se è gia loggato, lo reindirizziamo alla pagina dei post
  isAlreadyLoggedIn: boolean = false;
  isLoggedInText: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Controlla se c'è un utente salvato in memoria
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.auth.loggedInUser = user;
      this.isLoggedInText = "Welcome back " + user.name + "!. You are already logged in. Redirecting to posts page...";
      this.isAlreadyLoggedIn = true;
      console.log("Redirecting to posts page...");
      // aggiorna anche il BehaviorSubject (facoltativo ma utile)
      this.auth.loggedInUserSubject.next(user);
      setTimeout(() => {
        this.router.navigate(['/posts']);
      }, 2000); 
    }
  }

  onSubmit(): void {
    this.auth.login(this.username, this.password, this.rememberMe).subscribe({
      next: () => {
        this.router.navigate(['/posts']);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
  

}
