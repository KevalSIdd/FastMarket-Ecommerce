import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLink } from '@angular/router';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NzInputModule, NzButtonModule, NzWaveModule, RouterLink]
})
export class ForgotpassComponent implements OnInit {
  email = '';
  error = '';
  loading = false;

  constructor(private _auth: AuthService, private toastr: ToastrService) { }


  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    this.error = '';

    if (!this.email) {
      this.error = 'Make sure to fill everything ;)';
    }
    else {
      this._auth.forgotPassword(this.email).subscribe(
        (response) => {
         
          this.loading = false;
          if (response.success === 1)
            this.toastr.success(response.message);
          else this.toastr.error(response.message);

        },
        (error) => {
          this.loading = false;
          this.toastr.error('Somthing Went Wrong')
        }
      )
    }
  }
}