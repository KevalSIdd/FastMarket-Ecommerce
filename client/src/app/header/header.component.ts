import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { TokenStorageService } from '../services/token-storage.service';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { RouterLink } from '@angular/router';
import { NgStyle, NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ToastrService } from 'ngx-toastr';
import { CartupdateService } from '../services/cartupdate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    NzButtonModule,
    NzIconModule,
    NgStyle,
    RouterLink,
    NzDropDownModule,
    NgIf,
    NgFor,
    NzWaveModule,
    CurrencyPipe,
  ],
})
export class HeaderComponent implements OnInit {
  screenHeight: any;
  screenWidth: any;
  isMenuOpen = false;
  isMobile = false;
  isLoggedIn = false;
  dropdownVisible = false;
  username: any

  userId: number;
  cartItems: any[] = []

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    if (this.screenWidth > 768) this.isMobile = false;
    else this.isMobile = true;
  }

  constructor(
    private _token: TokenStorageService,
    private _auth: AuthService,
    private _cart: CartService,
    private _toast: ToastrService,
    private cartupdate: CartupdateService

  ) {
    this.getScreenSize();
    this._auth.user.subscribe((user) => {
      if (user) this.isLoggedIn = true;
      else this.isLoggedIn = false;
    });

  }

  ngOnInit(): void {
    if (this._token.getUser()) this.isLoggedIn = true;
    else this.isLoggedIn = false;

    this._auth.user.subscribe((user) => {
      this.isLoggedIn = user
      this.username = user ? user.username : null;;
    })
    this.featchData()

    this.userId = this._auth.getUserID();
    this.cartupdate.cartUpdate.subscribe(() => {
      this.featchData()
    })


    this.cartupdate.cartItems$.subscribe(cartItems => {
      this.cartItems = cartItems
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  featchData(): void {
    this._cart.getCartItem(this.userId).subscribe((data: any) => {
      this.cartItems = data.data
      this.cartItems.forEach(item => {
        item.subtotal = item.iQty * item.price;
      });
    }), (error: any) => {

    }
  }

  removeProductFromCart(productId: number, qty: number) {
    this._cart.addProduct(qty, productId).subscribe((resp: any) => {
      this.featchData();
      this.cartupdate.RemoveItem();
      this._toast.success(resp.message, 'Deleted', { timeOut: 2000 })
    });
  }


  getTotalItems(): number {

    return this.cartItems.reduce((total, item) => total + item.iQty, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.iQty * item.price), 0);
  }

  logout() {
    this._auth.logout();
    this.isMenuOpen = false;
  }
}
