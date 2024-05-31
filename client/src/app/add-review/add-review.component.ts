import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbRatingModule],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.scss'
})
export class AddReviewComponent implements OnInit {

  @Output() reviewAdded = new EventEmitter<any>();
  review = {
    userId: null,
    productId: null,
    rating: 0,
    description: ''
  };

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get the userId from AuthService
    this.review.userId = this.authService.getUserID();
    // Get the productId from route parameters
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.review.productId = parseInt(productId);
      }
    });
  }

  onSubmit(): void {
    if (this.review.rating < 0.5 || this.review.rating > 5) {
      this.toastr.error('Rating must be between 0.5 and 5', 'Error');
      return;
    }

    if (!this.review.userId || !this.review.productId) {
      this.toastr.error('User ID or Product ID is missing', 'Error');
      return;
    }

    // Use ReviewService to add a review
    this.reviewService.Addreview(this.review).subscribe(
      response => {
        if (response.success === 1) {
          // this.review = response.data
          this.toastr.success('Review added successfully', 'Success');
          this.reviewAdded.emit(response.data)
          console.log('Emit event data called', response.data);
          this.review.description = '';
          this.review.rating = 0;


        } else {
          this.toastr.error(response.message, 'Error');
        }
      },
      error => {
        this.toastr.error('Failed to add review', 'Error');
        console.error('Error adding review:', error);
      }
    );
  }

}
