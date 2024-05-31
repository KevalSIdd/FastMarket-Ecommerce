import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Products, Product } from '../shared/models/product.model';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NzButtonModule,
    NzIconModule,
    NgStyle,
    NgbModule,
    NzSpinModule,
    ProductCardComponent,
    NzWaveModule,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  loading = false;
  productPageCounter = 1;
  additionalLoading = false;
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  public screenWidth: any;
  public screenHeight: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.loading = true;
    setTimeout(() => {
      this.productService.getAllProducts(6, this.productPageCounter).subscribe(
        (res: any) => {
          this.products = res.data.productList;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
        }
      );
    }, 500);
  }

  showMoreProducts(): void {
    this.additionalLoading = true;
    this.productPageCounter = this.productPageCounter + 1;
    setTimeout(() => {
      this.productService.getAllProducts(6, this.productPageCounter).subscribe(
        (res: any) => {
          this.products = [...this.products, ...res.data.productList];
          this.additionalLoading = false;
        },
        (err) => {
          console.error("Error fetching additional products:", err);
          this.additionalLoading = false;
        }
      );
    }, 500);
  }
}
