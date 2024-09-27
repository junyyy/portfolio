import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessToken: string = '';
  private idToken: string = '';
  private refreshToken: string = '';
  private readonly accessTokenKey = 'access_token';

  constructor(private router: Router, private jwtHelper: JwtHelperService, private storage: StorageService) {

  }


  login(username: string, pwd: string) {
    this.storage.setItem(this.accessTokenKey, 'access_token_content');
    this.router.navigate(['/home']);
  }

  logout() {
    this.storage.removeItem(this.accessTokenKey);
    this.router.navigate(['/auth/login']);
  }

  get isLoggedIn(): boolean {
    return (this.storage.getItem(this.accessTokenKey)?.length ?? 0) > 0;
  }
}
