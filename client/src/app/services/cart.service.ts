import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  public products: any[] = []


  constructor(
    private http: HttpClient,
    private authuser: AuthService,
    private getsinglePid: ProductService
  ) { }

  getCartItem(userId: number): Observable<any> {
    userId = this.authuser.getUserID();
    const data = this.http.get<any>(`${environment.apiUrl}cart/list`, { params: { userId } })
    return data
  }


  addProduct(qty: number, productId: number): Observable<any> {
    const userId = this.authuser.getUserID(); // Get the correct userId from AuthService

    return new Observable(observer => {
      const payload = { id: productId, userId };

      this.getsinglePid.getSingleProduct(payload).subscribe(
        (product: any) => {
          const cartPayload = {
            userId,
            qty,
            productId: product.id
          };


          this.http.post<any>(`${environment.apiUrl}cart/add`, cartPayload).subscribe(
            (response) => {
              observer.next(response);
              observer.complete();
            },
            (error) => {
              observer.error(error);
            }
          );
        },
        (error) => {
          observer.error(error); // Handle error when fetching the product
        }
      );
    });
  }


  updateProduct(qty: number, productId: number): Observable<any> {

    const userId = this.authuser.getUserID(); // Get the correct userId from AuthService

    return new Observable(observer => {
      const payload = { id: productId, userId };

      this.getsinglePid.getSingleProduct(payload).subscribe(
        (product: any) => {
          const cartPayload = {
            userId,
            qty,
            productId: product.id
          };


          this.http.post<any>(`${environment.apiUrl}cart/add`, cartPayload).subscribe(
            (response) => {
              observer.next(response);
              observer.complete();
            },
            (error) => {
              observer.error(error);
            }
          );
        },
        (error) => {
          observer.error(error); // Handle error when fetching the product
        }
      );
    });
  }
}
