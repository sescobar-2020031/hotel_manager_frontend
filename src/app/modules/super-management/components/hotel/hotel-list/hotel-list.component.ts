import { Component, ViewEncapsulation } from '@angular/core';
import { Hotel } from '../../../models/hotel.interface';
import { HotelService } from '../../../services/hotel.service';
import { SessionUserService } from '../../../../../core/services/session-user.service';
import { Router } from '@angular/router';
import { Action } from '../../../../../shared/pipes/get-title-edit-delete-component.pipe';

@Component({
  selector: 'hotelmger-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HotelListComponent {
  loading: boolean = false;
  hotelList: Array<Hotel> = [];

  constructor(
    public hotelService: HotelService,
    public sessionUserService: SessionUserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.loadData();
  }

  loadData() {
    this.hotelService.getHotelList().subscribe({
      next: (response) => {
        this.hotelList = response.hotels;
        this.loading = true;
      },
      complete: () => {
        this.loading = false;
      },
      error: (err) => {
        if (err.error.showMessageError) {
          this.sessionUserService.detachFailureDialog(
            'Error obteniendo hoteles',
            err.error.message || 'Error obteniendo hoteles, intenta más tarde'
          )
        }
        this.loading = false;
      }
    })
  }

  editHotel(hotel: Hotel) {
    this.hotelService.setHotelSelected({
      action: Action.EDIT,
      hotel: hotel
    });

    this.router.navigate(['/super/hotel_edit_delete']);
  }

  redictToAdd(){
    this.router.navigate(['/super/hoteladd']);
  }
}
