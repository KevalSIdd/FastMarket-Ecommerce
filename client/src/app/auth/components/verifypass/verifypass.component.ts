import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verifypass',
  templateUrl: './verifypass.component.html',
  styleUrls: ['./verifypass.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NzAlertModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzWaveModule,
    RouterLink,
  ],
})
export class VerifypassComponent implements OnInit {
  errorMessage: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  email: string;
  resetSuccess: boolean = false;
  isPasswordVisible = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      // Access params here

      // Access individual parameter
      const id = params['email'];

    });
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords need to match';
      return;
    }
    this.authService.resetPassword(this.email, this.confirmPassword).subscribe(
      (resp) => {
        if (resp.response.success === 1) {
          this.resetSuccess = true;
          this.toastr.success(resp.response.message);
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(resp.response.message);
        }
      },
      (error) => {
        this.toastr.error(error.message);
        console.error('errrrr==============>', error);
      }
    );
  }
  togglePasswordVisibility(): void { // Method to toggle password visibility
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
