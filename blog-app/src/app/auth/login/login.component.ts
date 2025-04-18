import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  rememberMe: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

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
