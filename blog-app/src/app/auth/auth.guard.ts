import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}


  canActivate(): boolean {
    // controlla se l'utente è autenticato
    if (this.auth.isLoggedIn()) {
      return true; // si, consenti l'accesso alla rotta
    } else {
      this.router.navigate(['/login']); // reindirizza alla pagina di login
      return false; // l'utente non è autenticato, blocca l'accesso alla rotta
    }
  }

}
