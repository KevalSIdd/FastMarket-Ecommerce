import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private _route: Router, private _token: TokenStorageService) { }
  canActivate(): any {
    const currentUser = this._token.getUser();
    if (currentUser) {
      return true;
    }
    this._route.navigate(['/login']);
    return false;
  }
}
