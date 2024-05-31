import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AddressServiceService } from '../services/address-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-billinglist',
  templateUrl: './billinglist.component.html',
  styleUrls: ['./billinglist.component.scss'],
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule, NgbPaginationModule,
    MatPaginatorModule,
    NzTableModule
  ]
})
export class BillinglistComponent implements OnInit {



  @ViewChild('content') content: any;
  addressForm: FormGroup;
  isFormSubmitted: boolean = false
  selectedAddress: any = null
  modetitle: string = "Add Address"
  addresses: any[] = [];
  length: number
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent;
  userId: number
  currentPage = 1;

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.currentPage = e.pageIndex + 1;
    this.loadAddresses()
  }

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal, private addressService: AddressServiceService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
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
    this.selectedAddress = ''
    this.modetitle = 'Add Address';
    this.modalService.open(this.content)
    this.addressForm.reset()
  }


  loadAddresses() {
    const payload = {
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      userId: this.authService.getUserID()
    }
    this.addressService.getAddresses(payload).subscribe((resp: any) => {
      if (resp.success === 1) {
        this.addresses = resp.data
        this.length = resp.totalCount.totalCount
      }
    });
  }

  Add() {
    if (this.addressForm.valid) {
      let addressData = this.addressForm.value;
      if (this.selectedAddress) {
        addressData.id = this.selectedAddress.id;
        this.addressService.updateAddress(addressData.id, addressData).subscribe((resp: any) => {
          if (resp.success === 1) {
            this.loadAddresses();
            this.isFormSubmitted = true;
            this.closeModal();
            this.toastr.success(resp.message, 'Updated', { timeOut: 1000 });
          }
        })
      }

      else {
        this.addressService.addAddress(addressData).subscribe((resp: any) => {
          if (resp.success === 1) {
            this.loadAddresses();
            this.closeModal();
            this.isFormSubmitted = true;
            this.toastr.success(resp.message, 'Added', { timeOut: 1000 });
          }
        });
      }
    }
    else {
      this.addressForm.markAllAsTouched()
    }
  }
  deleteAddress(id: number) {
    if (confirm('Are you sure you want to delete this address?')) {
      this.addressService.deleteAddress(id).subscribe((res: any) => {
        this.loadAddresses();
        this.toastr.success(res.message, "Deleted", { timeOut: 1000 });
      });
    }
  }


  editAddress(content: any, id: number) {
    this.addressService.GetUserByID(id).subscribe((res: any) => {
      const address = res.data;
      this.addressForm.patchValue({
        addressName: address.vAddressName,
        addressLine1: address.vAddressLine1,
        addressLine2: address.vAddressLine2,
        city: address.vCity,
        state: address.vState,
        country: address.vCountry,
        phone: address.vPhone,
        pinCode: address.iPincode
      })
      this.selectedAddress = address
      this.modetitle = 'Edit Address'
      this.modalService.open(content, { centered: true });
    });
  }

  closeModal() {
    this.modetitle = 'Add Address';
    this.modalService.dismissAll();
  }

  pageChange(page: number) {
    this.currentPage = page
  }


}