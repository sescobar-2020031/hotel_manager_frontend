import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'hotelmger-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrl: './reservation-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ReservationModalComponent {
  minDate: Date = new Date;
  form!: FormGroup

  constructor(
    public dialogRef: MatDialogRef<ReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      checkInDate: null,
      checkOutDate: null
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmReservation(): void {
    console.log('conFIRM', this.form)
    this.dialogRef.close(this.form.getRawValue());
  }
}
