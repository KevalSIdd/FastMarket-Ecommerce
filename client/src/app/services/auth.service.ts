import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TokenStorageService } from './token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  private emailFromUrl: string;

  constructor(private _api: ApiService, private _token: TokenStorageService, private toastr: ToastrService,
    private route: ActivatedRoute

  ) {
    this.userSubject = new BehaviorSubject<any>(this._token.getUser());
    this.user = this.userSubject.asObservable()

    this.route.queryParamMap.subscribe(params => {
      this.emailFromUrl = params.get('email');
    });
  }


  isLoggedIn(): boolean {
    const token = this._token.getToken
    return token != null
  }


  getUser() {
    return this.userSubject.value;
  }

  getUserID() {
    const user = this.getUser();
    return user ? user.id : null;
  }

  login(credentials: any): Observable<any> {
    return this._api
      .postTypeRequest('auth/login', {
        email: credentials.email,
        password: credentials.password,
      })
      .pipe(
        map((res: any) => {
          let user = {
            email: credentials.email,
            username: res.data[0].username,
            token: res.token,
          };
          this._token.setToken(res.token);
          this._token.setUser(res.data[0]);
          this.userSubject.next(user);
          if (res.success == 1) {
            this.toastr.success(res.message, 'Login Success', { timeOut: 1000 });
          } else {
            this.toastr.error(res.message);
          }
          return user;
        })
      );
  }


  forgotPassword(email: string): Observable<any> {
    return this._api.postTypeRequest('auth/forgotPassword', { email });
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    const resetUrl = 'auth/createPassword';
    const payload = {
      email: this.emailFromUrl,
      newPassword: newPassword
    };

    return this._api.postTypeRequest(resetUrl, payload);
  }

  register(user: any): Observable<any> {
    return this._api.postTypeRequest('auth/register', {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
    });
  }

  logout() {
    this._token.clearStorage();
    this.userSubject.next(null);
    this.toastr.success('Logout successfully', 'Logout', { timeOut: 1000 });
  }
}
