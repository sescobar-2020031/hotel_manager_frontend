import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionUserService } from '../../../../../core/services/session-user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { HotelService } from '../../../../super-management/services/hotel.service';
import { Hotel } from '../../../../super-management/models/hotel.interface';
import { CreateUserRequest } from '../../../models/user.interface';

@Component({
  selector: 'hotelmger-useradd',
  templateUrl: './useradd.component.html',
  styleUrl: './useradd.component.scss'
})
export class UseraddComponent {
  loading: boolean = false;
  listHotels: Array<Hotel> = [];
  form!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private hotelService: HotelService,
    private router: Router,
    private sessionUserService: SessionUserService
  ) {
    this.form = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(''),
      name: new FormControl(''),
      identity_document: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      hotel_id: new FormControl(0)
    });
  }

  ngOnInit() {
    this.getHotelList();
  }

  getHotelList() {
    this.hotelService.getHotelList().subscribe(({
      next: (response) => {
        this.listHotels = response.hotels;
      },
      error: (err) => {
        if (err.error.showMessageError) {
          this.sessionUserService.detachFailureDialog(
            'Error obtiendo lista de hoteles.',
            err.error.message || 'Error obteniendo lista de hoteles, por favor intenta más tarde'
          )
        };
      }
    }))
  }


  sendForm() {
    this.loading = true;
    const createUserRequest: CreateUserRequest = this.form.getRawValue();
    this.userService.createUser(createUserRequest)
      .subscribe({
        next: (resp) => {
          this.sessionUserService.showSuccessDialog(
            'Usuario añadido correctamente',
            'Felicidades añadiste un nuevo Usuario'
          );
          this.loading = false;
          this.router.navigate(['/super/userlist']);
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          if (err.error.showMessageError) {
            this.sessionUserService.detachFailureDialog(
              'Error creando usuario 😥',
              err.error.message || 'Error creando usuario, intenta más tarde'
            ).subscribe(() => {
              this.router.navigate(['/super/userlist']);
            });
          }
        }
      })
  }

  
}
