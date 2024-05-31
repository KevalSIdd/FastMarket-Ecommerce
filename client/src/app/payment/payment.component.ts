import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { MaskitoDirective } from '@maskito/angular';
import type { MaskitoOptions } from '@maskito/core';
import { maskitoDateOptionsGenerator } from '@maskito/kit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgbAccordionModule, ReactiveFormsModule,
    MaskitoDirective, CommonModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {

  PaymentForm: FormGroup;
  isFormSubmitted: boolean = false
  startYearMonth: Date;
  @Output() paymentFormValidityChange = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder) {
    this.PaymentForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required]],
      cardName: ['', [Validators.required]],
      expirydate: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  get cardNumber() { return this.PaymentForm.get('cardNumber'); }
  get cardName() { return this.PaymentForm.get('cardName'); }
  get expirydate() { return this.PaymentForm.get('expirydate'); }
  get cvv() { return this.PaymentForm.get('cvv'); }

  submit() {
    if (this.PaymentForm.valid) {
      let paymentdata = this.PaymentForm.value
      this.isFormSubmitted = true
      console.log(paymentdata);
    }
    else {
      this.PaymentForm.markAllAsTouched()
    }
    this.paymentFormValidityChange.emit(this.PaymentForm.valid)
  }



  protected cardMask: MaskitoOptions = {
    mask: [
      ...new Array(4).fill(/\d/),
      ' ',
      ...new Array(4).fill(/\d/),
      ' ',
      ...new Array(4).fill(/\d/),
      ' ',
      ...new Array(4).fill(/\d/)
    ]
  }

  protected expriredMask = maskitoDateOptionsGenerator({
    mode: 'mm/yy',
    separator: '/'
  })

  protected cvvMask: MaskitoOptions = {
    mask: [...new Array(3).fill(/\d/)],
  }

}
