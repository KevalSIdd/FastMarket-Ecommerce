import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService } from '../services/order.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CartupdateService } from '../services/cartupdate.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    AgGridAngular,
    MatPaginatorModule
  ],
  providers: [DatePipe, CurrencyPipe]
})
export class OrderHistoryComponent implements OnInit {

  orders: any[] = []
  length: number
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent;
  currentPage = 1;

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.currentPage = e.pageIndex + 1;
    this.getorders()
  }


  constructor(private router: Router, private auth: AuthService, private order: OrderService,
    private currency: CurrencyPipe, private date: DatePipe, private cartupdate: CartupdateService
  ) { }

  ngOnInit(): void {
    this.getorders()


    this.cartupdate.orderPlaced$.subscribe(() => {
      this.getorders()
    })

  }

  colDefs: ColDef[] = [
    { field: "iOrderNumber", headerName: 'OrderID', minWidth: 100, sortable: false },
    {
      field: "dtOrderDate", headerName: 'Order Date', flex: 1,
      cellRenderer: (p: any) => {
        return this.date.transform(p.value, 'MMM d, y')
      },
      sortable: false
    },
    {
      field: "dSubTotal", headerName: 'Total', minWidth: 100,
      cellRenderer: (p: any) => {
        return this.currency.transform(p.value, 'USD')
      },
      sortable: false
    },
  ];


  pageChange(page: number) {
    this.currentPage = page
  }


  getorders() {
    const userId = this.auth.getUserID()
    const payload = {
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      userId
    }

    this.order.getorder(payload).subscribe((resp: any) => {
      if (resp.success === 1) {
        this.orders = resp.data
        this.length = resp.totalRecords
      }
    }), (error: any) => {
      console.log(error.message);
    }
  }

  navigateToOrderDetails(orderid: any) {
    this.router.navigate(['/order-details', orderid])
  }

}
