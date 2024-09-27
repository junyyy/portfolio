import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly tokenIssuer: string = 'https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_uUKF7vYlZ';

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private storage: StorageService,
    private http: HttpClient
  ) {}

  login(username: string, pwd: string): Observable<LoginResp> {
    const signInEndpoint =
      'https://8gvxppceqb.execute-api.ap-southeast-2.amazonaws.com/auth/v1/login';
    const requestBody = {
      Username: username,
      Password: pwd,
    };
    return this.http.post<LoginResp>(signInEndpoint, requestBody);
  }

  logout() {
    this.storage.removeItem(tokenKeys.accessTokenKey);
    this.router.navigate(['/auth/login']);
  }

  get isLoggedIn(): boolean {
    const accessToken = this.storage.getItem(tokenKeys.accessTokenKey)??'';
    const decoded = this.jwtHelper.decodeToken(accessToken);
    const isExpire = this.jwtHelper.isTokenExpired(accessToken);
    return decoded.iss && decoded.iss === this.tokenIssuer && decoded.username && !isExpire;
  }
}


export interface LoginResp {
  AccessToken?: string;
  ExpiresIn?: number;
  IdToken?: string;
  RefreshToken?: string;
  TokenType?: string;
}

export enum tokenKeys  {
  accessTokenKey = 'access_token',
  idTokenKey = 'id_token',
  refreshToken = 'refresh_token',
}
