import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../comman/env';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenIssuer: string = environment.cognitoIssuer;
  private loginResp: LoginResp | null = null;
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private storage: StorageService,
    private http: HttpClient
  ) {}

  login(username: string, pwd: string): Observable<LoginResp> {
    const signInEndpoint = `${environment.apiGatewayMain}/auth/v1/login`;
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

  set updateLoginResp(resp: LoginResp | null) {
    this.loginResp = resp;
  }

  get isLoggedIn(): boolean {
    const accessToken = this.loginResp
      ? this.loginResp?.AccessToken ?? ''
      : this.storage.getItem(tokenKeys.accessTokenKey) ?? '';
    const decoded = this.jwtHelper.decodeToken(accessToken);
    const isExpire = this.jwtHelper.isTokenExpired(accessToken);
    return (
      decoded &&
      decoded.iss &&
      decoded.iss === this.tokenIssuer &&
      decoded.username &&
      !isExpire
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

export enum tokenKeys {
  accessTokenKey = 'access_token',
  idTokenKey = 'id_token',
  refreshToken = 'refresh_token',
}
