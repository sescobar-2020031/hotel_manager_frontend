import { Component, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { SessionUserService } from '../../../../core/services/session-user.service';
import { SideMenuService } from '../../services/side-menu.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'hotelmger-logged-in-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
  items: MenuItem[] | undefined;

  constructor (
    private router: Router,
    public sessionUserService: SessionUserService,
    private sideMenuService: SideMenuService,
    private deviceService: DeviceDetectorService,
  ) {
    this.sessionUserService.onLogin$.subscribe(() => {
      const isDesktop = this.deviceService.isDesktop();
      if (isDesktop) {
        this.sideMenuService.sidenav.open();
      }
    });

    this.sessionUserService.onLogOff$.subscribe(() => {
      this.sideMenuService.sidenav.close();
    });
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: () => {
              this.sessionUserService.logOff();
              this.router.navigate(['/home/login']);
            }
          }
        ]
      }
    ];
  }

  toggleSideMenu(): void {
    this.sideMenuService.sidenav.toggle()
  }
}
