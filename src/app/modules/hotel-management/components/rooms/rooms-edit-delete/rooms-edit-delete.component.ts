
import { Component } from '@angular/core';
import { Action } from '../../../../../shared/pipes/get-title-edit-delete-component.pipe';
import { EditDeleteRoomData, EditRoomRequest, Rooms } from '../../../models/rooms.interface';
import {
  Types,
} from '../../../models/type.interface';
import { RoomsService } from '../../../services/rooms.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TypesService } from '../../../services/type.service';
import { Router } from '@angular/router';
import { SessionUserService } from '../../../../../core/services/session-user.service';

@Component({
  selector: 'hotelmger-hotel-edit-delete',
  templateUrl: './rooms-edit-delete.component.html',
  styleUrl: './rooms-edit-delete.component.scss',
})
export class RoomsEditDeleteComponent {
  action!: Action;
  hotel!: Rooms;
  loading = false;
  form!: FormGroup;
  types: Array<Types> = []; 

  constructor(
    public formBuilder: FormBuilder,
    private roomsService: RoomsService,
    private typesService: TypesService,
    private router: Router,
    private sessionUserService: SessionUserService
  ) {
    this.form = this.formBuilder.group({
      type_ID: new FormControl(''),
      room_Number: new FormControl(''),
      status: new FormControl(''),
    });
  }

  ngOnInit(): void {

    this.typesService.getHotelList().subscribe({
      next: (response) => {
        this.types = response.data;
      },
      error: (err) => {
        if (err.error.showMessageError) {
          this.sessionUserService.detachFailureDialog(
            'Error obteniendo los tipos de habitaciones 😥',
            err.error.message ||
              'Error obteniendo los tipos de habitaciones, intenta más tarde'
          );
        }
      },
    });

    const selected = this.roomsService.getHotelSelected();
    this.action = selected.action;
    this.hotel = selected.type;
    this.form.patchValue({ ...this.hotel });
  }

  backToList(): void {
    this.roomsService.setHotelSelected({} as EditDeleteRoomData);
    this.router.navigate(['/hotel/rooms']);
  }

  sendForm(): void {
    this.loading = true;
    if (this.action == Action.EDIT) {
      this.editAction();
    }
  }

  editAction(): void {
    let editHotelRequest: EditRoomRequest = this.form.getRawValue();
    editHotelRequest.room_ID = this.hotel.room_ID;
    this.roomsService.editHotel(editHotelRequest).subscribe({
      next: (response) => {
        this.sessionUserService.showSuccessDialog(
          'Habitacion editada correctamente',
          response.message
        );
        this.backToList();
      },
      error: (err) => {
        if (err.error.showMessageError) {
          this.sessionUserService.detachFailureDialog(
            'Error editando la habitacion 😥',
            err.error.message ||
              'Error editando la habitacion, intenta más tarde'
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
