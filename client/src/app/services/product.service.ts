import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products, Product } from '../shared/models/product.model';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient, private _api: ApiService) { }

  getAllProducts(limitOfResults = 9, page: any): Observable<Products> {
    return this.http.get<Products>(this.url + 'products', {
      params: {
        limit: limitOfResults.toString(),
        page: page,
      },
    });
  }

  getSingleProduct(payload: any): Observable<any> {
    let apiUrl = `products/${payload.id}`;
    if (payload.userId) {
      apiUrl += `?userId=${payload.userId}`;
    }
    return this._api.getTypeRequest(apiUrl);

    // return this._api.getTypeRequest(`products/${payload.id}?userId=${payload.userId}`);
  }

}


