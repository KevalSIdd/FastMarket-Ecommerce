import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  loading = false;
  isPasswordVisible = false;
  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.errorMessage = '';
    if (this.fullName && this.password && this.email && this.confirmPassword) {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords need to match';
      } else {
        this.loading = true;
        this._auth
          .register({
            fullName: this.fullName,
            email: this.email,
            password: this.password,
          })
          .subscribe(
            (res) => {

              this.loading = false;
              this._router.navigate(['/login']);
            },
            (err) => {
              this.errorMessage = err.error.message;
              this.loading = false;
            }
          );
      }
    } else {
      this.errorMessage = 'Make sure to fill everything ;)';
    }
  }

  canSubmit(): boolean {
    return this.fullName && this.email && this.password && this.confirmPassword
      ? true
      : false;
  }


  togglePasswordVisibility(): void { // Method to toggle password visibility
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
