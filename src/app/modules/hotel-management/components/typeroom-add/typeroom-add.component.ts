
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { CreateTypeRequest } from '../../models/type.interface';
import { TypesService } from '../../services/type.service';
import { Router } from '@angular/router';
import { SessionUserService } from '../../../../core/services/session-user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'hotelmger-hotel-add',
  templateUrl: './typeroom-add.component.html',
  styleUrl: './typeroom-add.component.scss'
})
export class TyperoomAddComponent {
  loading: boolean = false;
  form!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private hotelService: TypesService,
    private router: Router,
    private sessionUserService: SessionUserService
  ) {
    this.form = this.formBuilder.group({
      description: new FormControl(''),
      capacity: new FormControl(''),
      price_Per_Night: new FormControl(''),
    });
  }

  sendForm(){
    this.loading = true;
    const createHotelRequest: CreateTypeRequest = this.form.getRawValue();
    this.hotelService.createHotel(createHotelRequest)
      .subscribe({
        next: (resp) => {
          this.sessionUserService.showSuccessDialog(
            'Tipo de habitacion añadido correctamente',
            'Felicidades añadiste un nuevo tipo de habitacion'
          );
          this.loading = false;
          this.router.navigate(['/hotel/types']);
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          if (err.error.showMessageError) {
            this.sessionUserService.detachFailureDialog(
              'Error creando el tipo de habitacion 😥',
              err.error.message || 'Error creando el tipo de habitacion, intenta más tarde'
            ).subscribe(() => {
              this.router.navigate(['/hotel/types']);
            });
          }
        }
      })
  }
}
