import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const privateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const currentUser = authService.currentUser;

  if (currentUser) return true;

  router.navigate([ 'login' ]);
  return false;
};

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const currentUser = authService.currentUser;

  if (currentUser) {
    if(currentUser.license_number) {
      router.navigate([ 'app', 'search-trips' ]);
      return false;
    }
    return true;
  }

  router.navigate([ 'login' ]);
  return false;
};

export const driverGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const currentUser = authService.currentUser;

  if (currentUser) {
    if(!currentUser.license_number) {
      router.navigate([ 'app', 'order-service' ]);
      return false;
    }

    return true;
  }

  router.navigate([ 'login' ]);
  return false;
};
