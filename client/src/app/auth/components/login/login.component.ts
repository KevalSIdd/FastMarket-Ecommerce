import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    NzAlertModule,
    CommonModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzWaveModule,
    RouterLink,
  ],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error = '';
  loading = false;
  isPasswordVisible = false;

  constructor(private _auth: AuthService, private _router: Router, private toastr: ToastrService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Make sure to fill everything ;)';
    } else {
      this._auth
        .login({ email: this.email, password: this.password })
        .subscribe(
          (res) => {

            this.loading = false;
            this._router.navigate(['/']);

          },
          (err) => {

            this.error = err.error.message;
            this.loading = false;
          }
        );
    }
  }

  canSubmit(): boolean {
    return this.email.length > 0 && this.password.length > 0;
  }

  togglePasswordVisibility(): void { // Method to toggle password visibility
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}
