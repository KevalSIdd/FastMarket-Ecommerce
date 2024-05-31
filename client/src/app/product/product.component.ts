import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgStyle, CurrencyPipe, CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CartupdateService } from '../services/cartupdate.service';
import { ReviewComponent } from '../review/review.component';
import { AddReviewComponent } from '../add-review/add-review.component';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [
    NzButtonModule,
    NzIconModule,
    NgStyle,
    NzInputNumberModule,
    FormsModule,
    NzWaveModule,
    CurrencyPipe,
    CommonModule,
    RouterLink,
    ReviewComponent,
    AddReviewComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductComponent implements OnInit {


  id: number;
  product: any;
  quantity: number = 1;
  showcaseImages: any[] = [];
  reviews: any[] = [];
  loading = false;
  userId: number
  isLoggedIn: boolean
  activeTab: string = 'review-tab'
  showAddReview: boolean = true;


  constructor(
    private _route: ActivatedRoute,
    private _product: ProductService,
    private _cart: CartService,
    private _auth: AuthService,
    private toast: ToastrService,
    private cartUpdate: CartupdateService,
    private _reviewService: ReviewService
  ) { }

  ngOnInit(): void {

    this.isLoggedIn = this._auth.isLoggedIn()

    // this.userId = this._auth.getUserID();

    this._route.queryParams.subscribe(params => {
      const queryParamsUserId = params['userId'];
      if (queryParamsUserId) {
        this.userId = queryParamsUserId;
      }
    });

    this._route.paramMap
      .pipe(
        map((param: any) => {
          return param.params.id;
        })
      )
      .subscribe((productId) => {
        this.id = parseInt(productId);
        this.fetchReviews()
        this.fetchproductdetails()
      });
  }

  fetchproductdetails() {
    if (!this.id) {
      this.toast.error('Product Id is Not Found!!')
      return
    }

    const payload = {
      id: this.id
    }

    if (this.isLoggedIn) {
      const userId = this._auth.getUserID()
      if (userId) {
        payload['userId'] = userId
      }

    }

    this._product.getSingleProduct(payload).subscribe((product) => {
      this.product = product;
      if (product.quantity === 0) this.quantity = 0;
      else this.quantity = 1;

      if (product.images) {
        this.showcaseImages = product.images.split(';');
      }
      this.loading = false;
    });
    this.fetchReviews()

  }
  addToCart(productId: number): void {

    if (!this.isLoggedIn) {
      this.toast.warning('Please log in to add items to your cart');
      return;
    }

    if (!this.product || this.quantity <= 0) {
      this.toast.error('Product not available or out of stock');
      return;
    }

    // if (!this.userId || !productId || !this.quantity) {
    //   console.error('Missing userId, productId, or qty')
    //   return;
    // }

    this._cart.addProduct(this.quantity, productId).subscribe((resp: any) => {
      if (resp.success === 1) {

        this.cartUpdate.updateCart()
        this.toast.success(resp.message, 'Added', { timeOut: 2000 })
      }
    }), (error: any) => {
      console.log("Error:", error.message);
      this.toast.error(error.message, 'Error', { timeOut: 2000 })
    }
  }

  validateNumericInput(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', '.'];


    if (
      (event.key === 'a' && (event.ctrlKey || event.metaKey)) ||
      (event.key === 'c' && (event.ctrlKey || event.metaKey)) ||
      (event.key === 'v' && (event.ctrlKey || event.metaKey)) ||
      (event.key === 'x' && (event.ctrlKey || event.metaKey))
    ) {
      return;
    }
    if (
      (isNaN(Number(event.key)) && !allowedKeys.includes(event.key)) ||
      (event.key === '.' && (<HTMLInputElement>event.target).value.includes('.'))
    ) {
      event.preventDefault();
    }
  }

  fetchReviews(): void {
    if (isNaN(this.id)) {
      console.error('Invalid product ID:', this.id);
      return;
    }

    this._reviewService.getReview(this.id).subscribe(
      (resp) => {
        this.reviews = resp.data; // Store reviews
        console.log('Fetch Review', this.reviews);

      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }


  onReviewAdded(): void {
    this.showAddReview = false
    // this.product.isRated = true
    this.fetchReviews()
  }

}