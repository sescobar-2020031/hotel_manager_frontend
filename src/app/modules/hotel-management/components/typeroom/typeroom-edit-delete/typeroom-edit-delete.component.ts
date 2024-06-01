import { Component } from '@angular/core';
import { Action } from '../../../../../shared/pipes/get-title-edit-delete-component.pipe';
import {
  EditDeleteTypeData,
  EditTypeRequest,
  Types,
} from '../../../models/type.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TypesService } from '../../../services/type.service';
import { Router } from '@angular/router';
import { SessionUserService } from '../../../../../core/services/session-user.service';

@Component({
  selector: 'hotelmger-hotel-edit-delete',
  templateUrl: './typeroom-edit-delete.component.html',
  styleUrl: './typeroom-edit-delete.component.scss',
})
export class TyperoomEditDeleteComponent {
  action!: Action;
  hotel!: Types;
  loading = false;
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

  ngOnInit(): void {
    const selected = this.hotelService.getHotelSelected();
    this.action = selected.action;
    this.hotel = selected.type;
    this.form.patchValue({ ...this.hotel });
  }

  backToList(): void {
    this.hotelService.setHotelSelected({} as EditDeleteTypeData);
    this.router.navigate(['/hotel/types']);
  }

  sendForm(): void {
    this.loading = true;
    if (this.action == Action.EDIT) {
      this.editAction();
    }
  }

  editAction(): void {
    let editHotelRequest: EditTypeRequest = this.form.getRawValue();
    editHotelRequest.type_ID = this.hotel.type_ID;
    this.hotelService.editHotel(editHotelRequest).subscribe({
      next: (response) => {
        this.sessionUserService.showSuccessDialog(
          'Tipo de habitacion editado correctamente',
          response.message
        );
        this.backToList();
      },
      error: (err) => {
        if (err.error.showMessageError) {
          this.sessionUserService.detachFailureDialog(
            'Error editando el tipo de habitacion 😥',
            err.error.message ||
              'Error editando tipo de habitacion, intenta más tarde'
          );
        }
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
