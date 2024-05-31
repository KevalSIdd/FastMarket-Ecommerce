import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http: HttpClient) { }

  ordercreate(payload: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}cart/checkout`, payload)
  }

  getorder(payload: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}orders/list`, { params: { ...payload } })
  }

  orderdetails(payload: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}orders/details`, { params: { ...payload } })
  }
}
