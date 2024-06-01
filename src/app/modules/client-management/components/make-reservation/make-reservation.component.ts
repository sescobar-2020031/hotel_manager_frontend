import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HotelService } from '../../../super-management/services/hotel.service';
import { HotelWithExtras } from '../../../super-management/models/hotel.interface';
import { SessionUserService } from '../../../../core/services/session-user.service';

@Component({
  selector: 'hotelmger-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MakeReservationComponent implements OnInit {
  loading: boolean = false;
  listHotels: Array<HotelWithExtras> = [];
  images: string[] = [
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/518332246.jpg?k=852d9e83009ac082a7bb8366d5e27fb1f21801ea9cb6dde9c14e1aa99c49ea63&o=&hp=1',
    'https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnHFyGj0c1K-Mk106ZGT-juvcp-4Z8aMocHw&s',
    'https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZsnjx001ElbWv7pBT6k3ozorcjQOlfm-GYw&s',
    'https://media-api.xogrp.com/images/9f14737c-2be7-4b2f-80ed-d9c36556e7dd~rs_768.h',
    'https://media.istockphoto.com/id/119926339/es/foto/piscina-del-complejo-tur%C3%ADstico.jpg?s=612x612&w=0&k=20&c=xL-i7eF0tFmfvjZbWkOSvJTH5pzMVKWPt1iCTfZGwnw=',
    'https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65046bf150d1abb7e5911702_x-65046bcfdc4f0.webp',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/492106100.jpg?k=e5094f3f7d90049f7afda56b1e4756a152dfe658b5731b5de61cd50bc04c0e33&o=&hp=1',
  ];

  constructor(
    private hotelService: HotelService,
    private sessionUserService: SessionUserService
  ) { }

  map!: google.maps.Map;

  ngOnInit() {
    this.loadHotels();
    this.loadMap();
  }

  loadHotels() {
    this.loading = true;
    this.hotelService.getHotelList().subscribe({
      next: (response) => {
        this.listHotels = response.hotels.map(hotel => ({
          ...hotel,
          image: this.getRandomImage(),
          score: this.getRandomScore()
        }));
        this.addMarkers();
        this.loading = false;
      },
      error: (err) => {
        if (err.error.showMessageError) {
          this.sessionUserService.detachFailureDialog(
            'Error obteniendo lista de hoteles.',
            err.error.message || 'Error obteniendo lista de hoteles, por favor intenta más tarde'
          );
        }
        this.loading = false;
      }
    });
  }

  loadMap() {
    const mapOptions: google.maps.MapOptions = {
      center: new google.maps.LatLng(15.783471, -90.230759),
      zoom: 8
    };
    const mapElement = document.getElementById('map') as HTMLElement;
    this.map = new google.maps.Map(mapElement, mapOptions);
  }

  addMarkers() {
    this.listHotels.forEach(hotel => {
      new google.maps.Marker({
        position: this.getRandomLatLng(),
        map: this.map,
        title: hotel.name
      });
    });
  }

  getRandomLatLng(): google.maps.LatLng {
    return new google.maps.LatLng(this.getRandomLat(),this.getRandomLng());
  }

  getRandomLat(): number {
    return 15.783471 + (Math.random() - 0.5) * 2;  // Adjust the range as needed
  }

  getRandomLng(): number {
    return -90.230759 + (Math.random() - 0.5) * 2;  // Adjust the range as needed
  }

  getRandomScore(): number {
    return Math.floor(Math.random() * 5) + 1;
  }

  getRandomImage(): string {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }
}
