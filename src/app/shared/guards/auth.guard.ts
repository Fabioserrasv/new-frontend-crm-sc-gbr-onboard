import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ROUTES } from '../../config/routes';

export const authGuard: CanActivateFn = (route, state) => {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('jwtToken');
    const router = inject(Router)

    if (token) {
      const decodedToken = jwtDecode(token);
      const user = JSON.parse(decodedToken.sub!);

      if (user.id !== "-1") {
        return true;
      }
    }

    router.navigateByUrl(ROUTES.AUTH.LOGIN);
    return false;
  }
  return false;
}
