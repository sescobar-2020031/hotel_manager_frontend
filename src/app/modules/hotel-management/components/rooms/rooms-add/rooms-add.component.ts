
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CreateRoomRequest } from '../../../models/rooms.interface';
import { TypesService } from '../../../services/type.service';
import { Types } from '../../../models/type.interface';
import { RoomsService } from '../../../services/rooms.service';
import { Router } from '@angular/router';
import { SessionUserService } from '../../../../../core/services/session-user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'hotelmger-hotel-add',
  templateUrl: './rooms-add.component.html',
  styleUrl: './rooms-add.component.scss'
})
export class RoomsAddComponent {
  loading: boolean = false;
  form!: FormGroup;
  types: Array<Types> = [];

  constructor(
    public formBuilder: FormBuilder,
    private hotelService: RoomsService,
    private router: Router,
    private sessionUserService: SessionUserService,
    private typeService: TypesService
  ) {
    this.form = this.formBuilder.group({
      type_ID: new FormControl(''),
      room_Number: new FormControl(''),
      status: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.typeService.getHotelList().subscribe({
      next: (response) => {
        this.types = response.data;
      },
      error: (err) => {
        if (err.error.showMessageError) {
          this.sessionUserService.detachFailureDialog(
            'Error obteniendo tipos de habitaciones',
            err.error.message || 'Error obteniendo tipos de habitaciones, intenta más tarde'
          );
        }
      }
    })
  }

  sendForm(){
    this.loading = true;
    const createHotelRequest: CreateRoomRequest = this.form.getRawValue();
    this.hotelService.createHotel(createHotelRequest)
      .subscribe({
        next: (resp) => {
          this.sessionUserService.showSuccessDialog(
            'Habitacion añadida correctamente',
            'Felicidades añadiste una nueva habitacion'
          );
          this.loading = false;
          this.router.navigate(['/hotel/rooms']);
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          if (err.error.showMessageError) {
            this.sessionUserService.detachFailureDialog(
              'Error creando la habitacion 😥',
              err.error.message || 'Error creando la habitacion, intenta más tarde'
            ).subscribe(() => {
              this.router.navigate(['/hotel/rooms']);
            });
          }
        }
      })
  }
}
