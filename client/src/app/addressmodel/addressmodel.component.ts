import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { AddressServiceService } from '../services/address-service.service';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';


@Component({
  selector: 'app-addressmodel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addressmodel.component.html',
  styleUrl: './addressmodel.component.scss'
})
export class AddressmodelComponent {
  @ViewChild('content') content: any;
  addressForm: FormGroup;
  isFormSubmitted: boolean = false
  addresses: any[] = [];
  @Input() addressType: 'billing' | 'shipping';
  @Output() addressAdded = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal,
    private addressService: AddressServiceService,
    private toastr: ToastrService, private authService: AuthService, private activemodel: NgbActiveModal) {
    this.addressForm = this.formBuilder.group({
      addressName: ['home', Validators.required],
      addressLine1: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      addressLine2: ['', Validators.required],
      city: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      country: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      pinCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]]
    });
  }
  ngOnInit() {
    this.loadAddresses()
    timer(500).subscribe(() => this.addressService.setAddresses(this.addresses))
  }


  get addressName() { return this.addressForm.get('addressName'); }

  get addressLine1() { return this.addressForm.get('addressLine1'); }

  get addressLine2() { return this.addressForm.get('addressLine2'); }

  get city() { return this.addressForm.get('city'); }

  get state() { return this.addressForm.get('state'); }

  get country() { return this.addressForm.get('country'); }

  get pinCode() { return this.addressForm.get('pinCode'); }



  openForm() {
    this.addressForm.reset()
  }


  loadAddresses() {
    const payload = {
      userId: this.authService.getUserID()
    }
    this.addressService.getAddresses(payload).subscribe((resp: any) => {
      if (resp.success === 1) {
        this.addresses = resp.data
        this.addressService.setAddresses(this.addresses)

      }
    });
  }

  Add() {
    if (this.addressForm.valid) {
      let newAddress = this.addressForm.value;
      newAddress
      this.addressService.addAddress(newAddress).subscribe((resp: any) => {
        if (resp.success === 1) {
          this.addressService.addAddressAndNotify(resp.data);
          newAddress = this.addressType
          this.loadAddresses();
          this.addressAdded.emit(newAddress)
          this.activemodel.close(this.addressType)
          this.isFormSubmitted = true;
          this.toastr.success(resp.message, 'Added', { timeOut: 1000 });
        }
      }, (error: any) => {
        this.toastr.error('Failed to Add address', 'Error', error)
      })
    }
    else {
      this.addressForm.markAllAsTouched()
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
