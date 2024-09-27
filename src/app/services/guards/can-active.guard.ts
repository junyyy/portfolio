import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const canActiveGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (authService.isLoggedIn) {
    console.log(router);
    return true;
  }
  else {
    router.navigate(['/auth/login']);
    return false;
  };
}
