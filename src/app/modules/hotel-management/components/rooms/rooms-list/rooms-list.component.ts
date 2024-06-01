
import { Component, ViewEncapsulation } from '@angular/core';
import { Rooms } from '../../../models/rooms.interface';
import { RoomsService } from '../../../services/rooms.service';
import { SessionUserService } from '../../../../../core/services/session-user.service';
import { Router } from '@angular/router';
import { Action } from '../../../../../shared/pipes/get-title-edit-delete-component.pipe';

@Component({
  selector: 'hotelmger-hotel-list',
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RoomsListComponent {
  loading: boolean = false;
  hotelList: Array<Rooms> = [];

  constructor(
    public hotelService: RoomsService,
    public sessionUserService: SessionUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadData();
  }

  loadData() {
    this.hotelService.getHotelList().subscribe({
      next: (response) => {
        this.hotelList = response.data;
        this.loading = true;
      },
      complete: () => {
        this.loading = false;
      },
      error: (err) => {
        if (err.error.showMessageError) {
          this.sessionUserService.detachFailureDialog(
            'Error obteniendo habitaciones',
            err.error.message || 'Error obteniendo habitaciones, intenta más tarde'
          );
        }
        this.loading = false;
      },
    });
  }

  editHotel(hotel: Rooms) {
    this.hotelService.setHotelSelected({
      action: Action.EDIT,
      type: hotel,
    });

    this.router.navigate(['/hotel/edit_delete_rooms']);
  }

  redictToAdd() {
    this.router.navigate(['/hotel/addRooms']);
  }
}
