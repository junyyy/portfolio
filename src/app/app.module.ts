import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenKeysEnum } from './services/auth/auth.service';

function tokenGetter() {
  console.log('tokenGetter called')
  return localStorage.getItem(TokenKeysEnum.accessTokenKey);
}


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['8gvxppceqb.execute-api.ap-southeast-2.amazonaws.com'],
        disallowedRoutes: ['https://8gvxppceqb.execute-api.ap-southeast-2.amazonaws.com/auth/v1/login'],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
