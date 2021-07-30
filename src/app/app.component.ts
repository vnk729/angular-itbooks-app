import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public cartService: CartService,
    public authService: AuthService
  ) { }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.cartService.clearCart();
    this.authService.logout();
  }
}
