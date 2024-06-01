import { Component, ViewEncapsulation } from '@angular/core';
import { Types } from '../../models/type.interface';
import { TypesService } from '../../services/type.service';
import { SessionUserService } from '../../../../core/services/session-user.service';
import { Router } from '@angular/router';
import { Action } from '../../../../shared/pipes/get-title-edit-delete-component.pipe';

@Component({
  selector: 'hotelmger-hotel-list',
  templateUrl: './typeroom-list.component.html',
  styleUrl: './typeroom-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TyperoomListComponent {
  loading: boolean = false;
  hotelList: Array<Types> = [];

  constructor(
    public hotelService: TypesService,
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
            'Error obteniendo hoteles',
            err.error.message || 'Error obteniendo hoteles, intenta más tarde'
          );
        }
        this.loading = false;
      },
    });
  }

  editHotel(hotel: Types) {
    this.hotelService.setHotelSelected({
      action: Action.EDIT,
      type: hotel,
    });

    this.router.navigate(['/hotel/edit_delete_types']);
  }

  redictToAdd() {
    this.router.navigate(['/hotel/addTypes']);
  }
}
