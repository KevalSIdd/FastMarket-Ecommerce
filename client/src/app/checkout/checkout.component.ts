import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { NzProgressModule } from 'ng-zorro-antd/progress';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [
    NzProgressModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzWaveModule,
    RouterLink,
    CurrencyPipe,
    CommonModule
  ],
})
export class CheckoutComponent implements OnInit {
  currentUser: any;
  currentStep = 1;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCode: string;
  cartData: any;
  products: any;
  loading = false;
  successMessage = '';
  orderId;

  addressForm!: UntypedFormGroup
  isFormSubmitted: boolean = false



  constructor(private _cart: CartService, private _fb: UntypedFormBuilder) {
    // this._cart.cartDataObs$.subscribe((cartData) => {
    //   this.cartData = cartData;
    // });

    this.addressForm = this._fb.group({
      addressType: ['home', Validators.required],
      addressLine1: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      addressLine2: [''],
      city: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      State: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      Country: ['', [Validators.required, Validators.minLength(8)]],

      ZipCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]]
    })
  }

  ngOnInit(): void { }


  get addressLine1() { return this.addressForm.get('addressLine1'); }

  get city() { return this.addressForm.get('city'); }

  get State() { return this.addressForm.get('State'); }

  get Country() { return this.addressForm.get('Country'); }

  get ZipCode() { return this.addressForm.get('ZipCode'); }


  getProgressPrecent() {
    return (this.currentStep / 4) * 100;
  }

  submitBilling(): void {

    if (this.addressForm.valid) {
      const formdata = this.addressForm.value
      const AddressType = formdata.addressType
      this.nextStep();
      this.isFormSubmitted = true
    }
    else {

      this.addressForm.markAllAsTouched()
    }

  }

  canBillingSubmit(): boolean {
    return this.addressForm.valid ? true : false
  }

  submitPayment(): void {
    this.nextStep();
  }

  canPaymentSubmit(): boolean {
    return this.cardNumber && this.cardName && this.cardExpiry && this.cardCode
      ? true
      : false;
  }

  nextStep(): void {
    this.currentStep += 1;
    localStorage.setItem('checkoutStep', this.currentStep.toString());
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      localStorage.setItem('checkoutStep', this.currentStep.toString());
    }
  }


}
