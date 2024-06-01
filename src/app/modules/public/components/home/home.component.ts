import { Component, ViewEncapsulation } from '@angular/core';
import { HotelImages, Testimonials } from '../../models/home.interface';

@Component({
  selector: 'hotelmger-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

  hotelImages: HotelImages[] = [
    {
      url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/518332246.jpg?k=852d9e83009ac082a7bb8366d5e27fb1f21801ea9cb6dde9c14e1aa99c49ea63&o=&hp=1',
      description: 'hotel image 1'
    },
    {
      url: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?cs=srgb&dl=pexels-pixabay-261102.jpg&fm=jpg',
      description: 'hotel image 2'
    },
    {
      url: 'https://image-tc.galaxy.tf/wijpeg-3fgmgojdilcsntlqdalkyoyqs/pool.jpg?width=1920',
      description: 'hotel image 3'
    },
    {
      url: 'https://www.eastwoodrichmondehotel.com.ph/wp-content/uploads/2024/01/Slideshow3.jpg',
      description: 'hotel image 4'
    },
    {
      url: 'https://alimarahotel.com/wp-content/uploads/2024/03/HOTEL_ALIMARA_01-1110x741.jpg',
      description: 'hotel image 5'
    },
    {
      url: 'https://catalonia-riviera-maya.hoteles-en-puerto-aventuras.com/data/Images/OriginalPhoto/12733/1273380/1273380070/image-puerto-aventuras-catalonia-riviera-maya-hotel-43.JPEG',
      description: 'hotel image 6'
    }
  ];

  testimonials: Testimonials[] = [
    {
      name: 'Carlos Mendoza',
      rating: '⭐⭐⭐⭐',
      comment: 'Hotel Manager es la aplicación más amigable y eficiente que he utilizado. Todo el proceso toma tiempo para presentar el producto y como resultado ofrece solo las mejores oportunidades que realmente se ajustan a tus necesidades. Te ayudan de principio a fin para crear una gran experiencia de reserva.',
      image: 'https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg?size=626&ext=jpg&ga=GA1.1.1488620777.1712016000&semt=sph'
    },
    {
      name: 'Laura García',
      rating: '⭐⭐⭐⭐⭐',
      comment: 'La mejor aplicación para reservar hoteles que he usado. Muy fácil de navegar y el servicio al cliente es excelente. Me ayudaron con todas mis dudas y la experiencia de reserva fue increíble.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEpBqPhXZqP_3PombkXEgn57D8MyC14qhrnADFYd90tg&s'
    },
    {
      name: 'Pedro Guillen',
      rating: '⭐⭐⭐⭐',
      comment: 'Hotel Manager hizo mi vida mucho más fácil. Encontré el hotel perfecto para mis vacaciones y el proceso de reserva fue sencillo y rápido. Definitivamente la recomendaré a mis amigos.',
      image: 'https://img.freepik.com/foto-gratis/apuesto-joven-brazos-cruzados-sobre-fondo-blanco_23-2148222620.jpg'
    }
  ];

  activeIndex = 0;

  previousTestimonial() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    } else {
      this.activeIndex = this.testimonials.length - 1;
    }
  }

  nextTestimonial() {
    if (this.activeIndex < this.testimonials.length - 1) {
      this.activeIndex++;
    } else {
      this.activeIndex = 0;
    }
  }
}
