import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CartupdateService } from '../services/cartupdate.service';
import { NewcheckoutComponent } from '../newcheckout/newcheckout.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NzInputNumberModule,
    FormsModule,
    NzButtonModule,
    NzWaveModule,
    CurrencyPipe,
    RouterLink,
    RouterLinkActive,
    NewcheckoutComponent
  ],
})
export class CartComponent implements OnInit {


  userId: number;
  cartItems: any[] = []
  updatedcart: any[] = []


  constructor(private _cart: CartService, private auth: AuthService, private toastr: ToastrService, private cartupdate: CartupdateService) { }

  ngOnInit(): void {
    this.userId = this.auth.getUserID();
    this.featchData()
    this.cartupdate.removeitem.subscribe(() => {
      this.featchData()
    })

    this.cartupdate.cartItems$.subscribe(cartItems => {
      this.cartItems = cartItems;
      this.calculateFinalTotal();
    });


    const total = this.calculateFinalTotal()
    this.cartupdate.updateTotal(total)

  }

  featchData(): void {
    this._cart.getCartItem(this.userId).subscribe((data: any) => {

      this.cartItems = data.data
      this.cartItems.forEach(item => {
        item.subtotal = item.iQty * item.price;
      });

      this.cartupdate.updateCartItems(this.cartItems);
      this.calculateFinalTotal();
    }), (error: any) => {


    }
  }

  removeItem(productId: number, qty: number) {
    this._cart.addProduct(qty, productId).subscribe((resp: any) => {
      this.featchData();
      this.toastr.success(resp.message, 'Deleted', { timeOut: 2000 });
      this.cartupdate.updateCartItems(this.cartItems);
    });
  }



  updateQuantity(productId: number, qty: number): void {
    this._cart.updateProduct(qty, productId).subscribe((resp: any) => {
      if (resp) {
        console.log(resp);
      }

    })
  }


  calculateFinalTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.iQty * item.price), 0);
  }

}
