import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessToken: string = '';
  private idToken: string = '';
  private refreshToken: string = '';
  constructor(private router: Router, private jwtHelper: JwtHelperService) {

  }


  login(username: string, pwd: string) {

  }

  logout() {
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return false;
  }
}
