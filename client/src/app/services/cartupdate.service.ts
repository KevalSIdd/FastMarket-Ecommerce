import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartupdateService {

  cartUpdate: EventEmitter<any> = new EventEmitter<any>()
  removeitem: Subject<void> = new Subject<void>()

  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private totalSubject = new BehaviorSubject<number>(0);
  total$ = this.totalSubject.asObservable();


  private orderPlacedSubject = new Subject<void>();
  orderPlaced$ = this.orderPlacedSubject.asObservable();

  private reviewaddedSubject = new Subject<void>()
  reviewAdded$ = this.reviewaddedSubject.asObservable()



  constructor() { }

  updateTotal(total: number) {
    this.totalSubject.next(total);
  }

  updateCartItems(cartItems: any[]) {
    this.cartItemsSubject.next(cartItems);
  }

  updateCart() {
    this.cartUpdate.emit()
  }

  RemoveItem() {
    this.removeitem.next()
  }

  notifyOrderPlaced() {
    this.orderPlacedSubject.next(); // Notify subscribers
  }

  notifyReviewAdded() {
    this.reviewaddedSubject.next()
  }

}
