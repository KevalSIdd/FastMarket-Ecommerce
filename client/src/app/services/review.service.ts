import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) { }



  Addreview(payload: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}review/add`, payload)
  }

  getReview(productId: number): Observable<any> {
    const endpoint = `${environment.apiUrl}review/${productId}`
    return this.http.get(endpoint)
  }

}
