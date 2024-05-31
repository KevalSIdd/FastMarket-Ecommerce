import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, JsonPipe } from '@angular/common';
import { AddReviewComponent } from '../add-review/add-review.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [NgbRatingModule, DatePipe, AddReviewComponent, JsonPipe],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit {

  // reviewdata: any[] = []
  @Input() productId!: number;
  @Input() reviewdata!: any[];

  constructor(private _review: ReviewService) { }

  ngOnInit(): void {
  }


}

