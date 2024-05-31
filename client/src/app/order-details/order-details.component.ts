import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
  providers: [DatePipe, CurrencyPipe]
})
export class OrderDetailsComponent implements OnInit {

  orderdetails: any = {}
  orderNumber: any
  totalAmount: number = 0;
  payoutstatus: string = ''
  orderdate: any
  currentUser: any;
  constructor(private route: ActivatedRoute, private orderService: OrderService, private authService: AuthService) { }
  ngOnInit(): void {
    this.route.params.subscribe(event => {
      this.orderNumber = event['orderid']
    });

    this.currentUser = this.authService.getUser();
    this.getdetails()
  }

  getdetails(): void {
    const payload = {
      orderNumber: this.orderNumber
    }
    this.orderService.orderdetails(payload).subscribe((resp: any) => {
      this.orderdetails = resp.data
      this.payoutstatus = resp.data.paymentStatus.payoutStatus
      this.orderdate = resp.data.paymentStatus.orderDate
      if (this.orderdetails.products && this.orderdetails.products.length > 0) {
        this.calculateTotal();
      }
    }), (error: any) => {
      console.log(error.message);

    }
  }

  calculateTotal(): void {
    this.totalAmount = this.orderdetails.products.reduce((acc: any, product: any) => {
      return acc + (product.dSubTotal || 0);
    }, 0);
  }
}
