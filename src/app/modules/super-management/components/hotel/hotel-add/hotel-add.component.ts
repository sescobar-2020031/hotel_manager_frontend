import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CreateHotelRequest } from '../../../models/hotel.interface';
import { HotelService } from '../../../services/hotel.service';
import { Router } from '@angular/router';
import { SessionUserService } from '../../../../../core/services/session-user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'hotelmger-hotel-add',
  templateUrl: './hotel-add.component.html',
  styleUrl: './hotel-add.component.scss'
})
export class HotelAddComponent {
  loading: boolean = false;
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

  sendForm(){
    this.loading = true;
    const createHotelRequest: CreateHotelRequest = this.form.getRawValue();
    this.hotelService.createHotel(createHotelRequest)
      .subscribe({
        next: (resp) => {
          this.sessionUserService.showSuccessDialog(
            'Hotel añadido correctamente',
            'Felicidades añadiste un nuevo hotel'
          );
          this.loading = false;
          this.router.navigate(['/super/hotellist']);
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          if (err.error.showMessageError) {
            this.sessionUserService.detachFailureDialog(
              'Error creando hotel 😥',
              err.error.message || 'Error creando hotel, intenta más tarde'
            ).subscribe(() => {
              this.router.navigate(['/super/hotellist']);
            });
          }
        }
      })
  }
}
