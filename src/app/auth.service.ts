import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(this.isLoggedIn), 1000);
    });
  }
}
