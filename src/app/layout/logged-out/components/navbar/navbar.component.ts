import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'hotelmger-logged-out-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        route: '/home/landing'
      },
      {
        label: 'Nosotros',
        icon: 'pi pi-question-circle',
        route: '/home/aboutUs'
      }
    ];
  }
}
