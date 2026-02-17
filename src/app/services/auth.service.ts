import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginStatus = new BehaviorSubject<boolean>(this.getInitialStatus());
  isLoggedIn$ = this.loginStatus.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private getInitialStatus(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('isAdmin') === 'true';
    }
    return false;
  }

  updateLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }
}