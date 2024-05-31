import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AddressServiceService {

  addressAdded = new EventEmitter<any>();
  private addressesSubject = new BehaviorSubject<any[]>([]);
  addresses$ = this.addressesSubject.asObservable();
  private newAddressSubject = new BehaviorSubject<any>([]);
  newAddress$ = this.newAddressSubject.asObservable();


  constructor(private http: HttpClient, private authser: AuthService) { }

  setAddresses(addresses: any[]) {
    this.addressesSubject.next(addresses);
  }

  getAddresses(payload: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}users/address/list`, { params: payload });
  }

  addAddressAndNotify(address: any) {
    const currentAddresses = this.addressesSubject.value;
    const updatedAddresses = [...currentAddresses, address];
    this.addressesSubject.next(updatedAddresses);
    this.newAddressSubject.next(address)
  }

  addAddress(address: any): Observable<any> {
    const userId = this.authser.getUserID()
    const payload = { ...address, userId }
    return this.http.post<any>(`${environment.apiUrl}users/address/add`, payload);
  }

  updateAddress(id: any, address: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}users/address/update?id=`, address, { params: { id } });
  }

  GetUserByID(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}users/address/details?id=${id}`);
  }


  deleteAddress(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}users/address/delete?id=${id}`);
  }
}