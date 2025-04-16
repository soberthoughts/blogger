import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  onSubmit(): void {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/posts']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

}
