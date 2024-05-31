import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dailog',
  standalone: true,
  imports: [
    MatDialogModule
  ],
  templateUrl: './confirm-dailog.component.html',
  styleUrl: './confirm-dailog.component.scss'
})
export class ConfirmDailogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmDailogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
