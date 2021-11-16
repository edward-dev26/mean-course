import { Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string },
    public snackBarRef: MatSnackBarRef<ErrorComponent>
  ) {}

  onClose() {
    this.snackBarRef.dismiss();
  }
}
