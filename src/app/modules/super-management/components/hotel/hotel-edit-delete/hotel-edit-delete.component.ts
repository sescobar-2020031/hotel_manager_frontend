import { Component } from '@angular/core';
import { Action } from '../../../../../shared/pipes/get-title-edit-delete-component.pipe';
import { EditDeleteHotelData, EditHotelRequest, Hotel } from '../../../models/hotel.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HotelService } from '../../../services/hotel.service';
import { Router } from '@angular/router';
import { SessionUserService } from '../../../../../core/services/session-user.service';

@Component({
  selector: 'hotelmger-hotel-edit-delete',
  templateUrl: './hotel-edit-delete.component.html',
  styleUrl: './hotel-edit-delete.component.scss'
})
export class HotelEditDeleteComponent {
  action!: Action;
  hotel!: Hotel;
  loading = false;
  form!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private hotelService: HotelService,
    private router: Router,
    private sessionUserService: SessionUserService
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl('')
    });
  }

  ngOnInit(): void {
    const selected = this.hotelService.getHotelSelected();
    this.action = selected.action;
    this.hotel = selected.hotel;
    this.form.patchValue(
      { ...this.hotel}
    );
  }

  backToList(): void {
    this.hotelService.setHotelSelected({} as EditDeleteHotelData);
    this.router.navigate(['/super/hotellist']);
  }

  sendForm(): void {
    this.loading = true;
    if (this.action == Action.EDIT) {
      this.editAction();
    }
  }

  editAction(): void {
    let editHotelRequest: EditHotelRequest = this.form.getRawValue();
    editHotelRequest.hotel_ID = this.hotel.hotel_ID;
    this.hotelService.editHotel(editHotelRequest).subscribe({
      next: (response) => {
        this.sessionUserService.showSuccessDialog(
          'Hotel editado correctamente',
          response.message
        );
        this.backToList();
      },
      error: (err) => {
        if(err.error.showMessageError){
          this.sessionUserService.detachFailureDialog(
            'Error editando hotel',
            err.error.message || 'Error editando hotel, intenta más tarde'
          )
        }
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
