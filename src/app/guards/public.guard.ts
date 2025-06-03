import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem('tf_user');

  if(user) {
    const currentUser = JSON.parse(user);
    if(currentUser.license_number) {
      router.navigate([ 'app', 'search-trips' ]);
      return false;
    }
    router.navigate([ 'app', 'order-service' ]);
    return false;

  }
  return true;
};
