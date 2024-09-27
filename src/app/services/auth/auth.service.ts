import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../storage/storage.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly accessTokenKey = 'access_token';
  private readonly idTokenKey = 'id_token';
  private readonly refreshToken = 'refresh_token';


  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private storage: StorageService,
    private http: HttpClient
  ) {}

  login(username: string, pwd: string) {
    const signInEndpoint =
      'https://8gvxppceqb.execute-api.ap-southeast-2.amazonaws.com/auth/v1/login';
    const requestBody = {
      Username: username,
      Password: pwd,
    };

    this.http.post<LoginResp>(signInEndpoint, requestBody).subscribe({
      next: (v) => {
        if (!v.AccessToken || !v.IdToken || !v.RefreshToken) {
          return;
        }
        this.storage.setItem(
          this.accessTokenKey,
          v.AccessToken
        );
        this.router.navigate(['/home']);
      },
      error: (e) => {
        // show error msg
      },
      complete: () => {

      } 
    }
    );
  }

  logout() {
    this.storage.removeItem(this.accessTokenKey);
    this.router.navigate(['/auth/login']);
  }

  get isLoggedIn(): boolean {
    return (
      (this.storage.getItem(this.accessTokenKey)?.length ?? 0) > 0
    );
  }
}


export interface LoginResp {
  AccessToken?: string;
  ExpiresIn?: number;
  IdToken?: string;
  RefreshToken?: string;
  TokenType?: string;
}