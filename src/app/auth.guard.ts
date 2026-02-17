import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
      return true; // Admin ulla polam
    }
  }

  // Admin illana login page-ku thallidum
  router.navigate(['/admin-login']);
  return false;
};