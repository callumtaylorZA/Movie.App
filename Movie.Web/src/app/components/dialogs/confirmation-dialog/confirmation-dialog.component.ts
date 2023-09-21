import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  type: string = '';
  message: string = '';

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(DIALOG_DATA) public data: [type: string, message: string]) {
    this.type = data[0];
    this.message = data[1];
  }

  yes(): void {
    this.dialogRef.close(true);
  }

  no(): void {
    this.dialogRef.close(false);
  }
}
