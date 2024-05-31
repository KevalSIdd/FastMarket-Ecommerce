import { Component, OnInit, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CartupdateService } from '../services/cartupdate.service';
import { ConfirmDailogComponent } from '../confirm-dailog/confirm-dailog.component';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NzButtonModule,
    NzWaveModule,
    CurrencyPipe,
    ConfirmDailogComponent
  ],
})
export class ProductCardComponent implements OnInit {
  @Input() title: string;
  @Input() image: string;
  @Input() short_desc: string;
  @Input() category: string;
  @Input() quantity: number;
  @Input() price: string;
  @Input() id: number;
  @Input() onAdd: any;
  @Input() product: any;

  userId: number;
  qty: number;

  constructor(private cartService: CartService, private auth: AuthService,
    private route: Router,
    private toast: ToastrService, private cartupdate: CartupdateService) {
  }

  ngOnInit(): void {
    this.userId = this.auth.getUserID();
    this.qty = 1;
  }

  addProducts(productId: number): void {
    if (!this.userId || !productId || !this.qty) {
      this.route.navigate(['/login'])
      return;
    }

    this.cartService.addProduct(this.qty, productId).subscribe((resp: any) => {
      if (resp.success === 1) {
        this.toast.success(resp.message, 'Added', { timeOut: 1000 })
        this.cartupdate.updateCart()
      }
    }), (error: any) => {
      console.log("Error:", error.message);
      this.toast.error(error.message, 'Error', { timeOut: 1000 })
    }
  }
}
