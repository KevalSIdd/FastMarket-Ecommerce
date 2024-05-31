import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AddressServiceService } from '../services/address-service.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressmodelComponent } from '../addressmodel/addressmodel.component';
import { AuthService } from '../services/auth.service';
import { PaymentComponent } from '../payment/payment.component';
import { CartupdateService } from '../services/cartupdate.service';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-newcheckout',
  standalone: true,
  imports: [NgbPaginationModule, ReactiveFormsModule,
    NgbAccordionModule, CommonModule, NgSelectModule,
    FormsModule, AddressmodelComponent, PaymentComponent, CurrencyPipe,
    RouterLink
  ],
  templateUrl: './newcheckout.component.html',
  styleUrl: './newcheckout.component.scss',
})

export class NewcheckoutComponent {
  billingAddresses: any[] = [];
  shippingAddresses: any[] = [];
  selectedAddress: any = null; // Billing address
  selectedShippingAddress: any = null; // Shipping address
  copyBillingToShipping: boolean = true // Checkbox state for copying billing to shipping
  cartItems: any[] = [];
  paymentFormValid: boolean = false;
  total: number = 0;

  constructor(
    private addressService: AddressServiceService,
    private modalService: NgbModal,
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private cartupdate: CartupdateService
  ) { }

  ngOnInit() {
    this.fetchCartData();
    this.loadBillingAddresses();
    this.loadShippingAddresses();
  }

  fetchCartData() {
    const userId = this.authService.getUserID();
    this.cartService.getCartItem(userId).subscribe((data: any) => {
      this.cartItems = data.data;
      this.cartupdate.updateCartItems(this.cartItems)
      this.total = this.calculateFinalTotal();
    });
  }

  calculateFinalTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.iQty * item.price), 0);
  }

  loadBillingAddresses() {
    const userId = this.authService.getUserID();
    this.addressService.getAddresses({ userId }).subscribe((resp: any) => {
      if (resp.success === 1) {
        this.billingAddresses = resp.data;

        this.selectedAddress = this.billingAddresses[0]; // Default billing address

      }
    });
  }

  loadShippingAddresses() {
    const userId = this.authService.getUserID();
    this.addressService.getAddresses({ userId }).subscribe((resp: any) => {
      if (resp.success === 1) {
        this.shippingAddresses = resp.data;
        this.selectedShippingAddress = this.shippingAddresses[0]; // Default shipping address
      }
    });
  }



  openAddressModel(addressType: 'billing' | 'shipping') {
    const modalRef = this.modalService.open(AddressmodelComponent, {
      centered: true,
    });
    modalRef.componentInstance.addressType = addressType;

    modalRef.result.then(
      (result) => {
        if (addressType === 'billing') {
          this.loadBillingAddresses(); // Reload only billing addresses
        } else {
          this.loadShippingAddresses(); // Reload only shipping addresses
        }
      },
      (dismissalReason) => {
        console.log('Modal dismissed:', dismissalReason);
      }
    );
  }

  openBillingList() {
    this.openAddressModel('billing'); // Open modal to add billing address
  }

  openShippingList() {
    this.openAddressModel('shipping'); // Open modal to add shipping address
  }

  onCopyToShippingChange() {
    if (this.copyBillingToShipping) {
      this.updateShippingAddress()
    } else {
      this.selectedShippingAddress = null; // Clear if unchecked
    }
  }

  onBillingAddressChange() {
    if (this.copyBillingToShipping) {
      this.updateShippingAddress(); // Update shipping address when billing address changes
    }
  }

  updateShippingAddress() {
    this.selectedShippingAddress = { ...this.selectedAddress }; // Copy billing to shipping
  }

  placeOrder() {
    if (!this.paymentFormValid) {
      this.toastr.warning('Please ensure payment details are valid');
      return;
    }

    const userId = this.authService.getUserID();
    const BillingAddressId = this.selectedAddress?.id;
    const shippingAddressId = this.selectedShippingAddress?.id;
    const productIds = this.cartItems.map((item) => item.id);

    const orderPayload = {
      userId,
      BillingAddressId,
      shippingAddressId,
      productIds,
    };

    this.orderService.ordercreate(orderPayload).subscribe(
      (resp) => {
        if (resp.success === 1) {
          this.cartupdate.notifyOrderPlaced()
          this.fetchCartData()
          this.toastr.success('Order placed successfully!');
        }
      },
      (error) => {
        this.toastr.error('Error placing order:', error.message);
      }
    );
  }

  onPaymentFormValidityChange(valid: boolean) {
    this.paymentFormValid = valid; // Update payment form validity
  }
}



