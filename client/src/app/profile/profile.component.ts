import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { TokenStorageService } from '../services/token-storage.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NgIf, NgStyle, NgFor } from '@angular/common';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        NzAlertModule,
        NgStyle,
        FormsModule,
        NgFor,
        NzInputModule,
    ],
})
export class ProfileComponent implements OnInit {
  user = [
    {
      key: 'fullName',
      label: 'Full name',
      value: '',
      type: 'text',
    },
    {
      key: 'email',
      label: 'Email address',
      value: '',
      type: 'email',
    },
    {
      key: 'password',
      label: 'Password',
      value: '',
      type: 'password',
    },
    {
      key: 'confirmPassword',
      label: 'Confirm password',
      value: '',
      type: 'password',
    },
  ];
  userId = null;
  alertMessage = '';
  alertType = '';
  alertVisible = false;
  loading = false;

  constructor(
    private _api: ApiService,
    private _token: TokenStorageService,
    private _router: Router
  ) {}

  // Update user fields with current details
  ngOnInit(): void {
    const { id, fname, email } = this._token.getUser();
    this.userId = id;
    this.user[0].value = fname;
    this.user[1].value = email;
  }

  canUpdate(): boolean {
    return this.user.filter((field) => field.value.length > 0).length !== 4
      ? true
      : false;
  }

  // Submit data to be updated
  onSubmit(): void {
    this.alertVisible = false;
    if (this.user[2].value !== this.user[3].value) {
      this.alertType = 'error';
      this.alertMessage = 'Passwords do not match';
      this.alertVisible = true;
    } else {
      this.loading = true;
      this._api
        .putTypeRequest(`users/${this.userId}`, {
          fullName: this.user[0].value,
          email: this.user[1].value,
          password: this.user[2].value,
        })
        .subscribe(
          (res: any) => {
            this.alertMessage = res.message;
            this.alertType = 'success';
            this.alertVisible = true;
            this.loading = false;
            const oldDetails = this._token.getUser();
            this._token.setUser({
              ...oldDetails,
              fname: this.user[0].value,
              email: this.user[1].value,
            });
            this.user[2].value = '';
            this.user[3].value = '';
            // window.location.reload();
          },
          (err: any) => {
            this.alertMessage = err.error.message;
            this.alertVisible = true;
            this.alertType = 'error';
            this.loading = false;
          }
        );
    }
  }
}
