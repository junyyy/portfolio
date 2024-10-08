import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  logout(): Observable<string> {
    const logoutEndpoint = `${environment.apiGatewayMain}/user/v1/logout`;
    return this.http.post<string>(logoutEndpoint, {});
  }

  set updateLoginResp(resp: LoginResp | null) {
    this.loginResp = resp;
  }

  get accessToken(): string {
    return this.loginResp
      ? this.loginResp?.AccessToken ?? ''
      : this.storage.getItem(TokenKeysEnum.accessTokenKey) ?? '';
  }

  get isLoggedIn(): boolean {
    const accessToken = this.loginResp
      ? this.loginResp?.AccessToken ?? ''
      : this.storage.getItem(TokenKeysEnum.accessTokenKey) ?? '';
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

export enum TokenKeysEnum {
  accessTokenKey = 'access_token',
  idTokenKey = 'id_token',
  refreshToken = 'refresh_token',
}
