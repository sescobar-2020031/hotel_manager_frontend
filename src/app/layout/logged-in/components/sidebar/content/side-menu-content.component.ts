import { Component, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { routes } from '../../../../../routes'
import { Observable, of } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';
import { SessionUserService } from '../../../../../core/services/session-user.service';
import { environment } from '../../../../../../environments/environment';
import { SideMenuService } from '../../../services/side-menu.service';
import { SharedModule } from '../../../../../shared/shared.module';
import { CondenseComponent } from '../condense/condense.component';


@Component({
  selector: 'hotelmger-logged-in-sidebar',
  templateUrl: './side-menu-content.component.html',
  styleUrls: ['./side-menu-content.component.scss'],
  standalone: true,
  imports: [SharedModule, CondenseComponent],
  encapsulation: ViewEncapsulation.None,
})
export class SideMenuContentComponent {
  version = environment.version;
  items: any[] = routes;
  isAdmin!: boolean;
  @ViewChildren(MatExpansionPanel) expansionPanels!: QueryList<MatExpansionPanel>;

  constructor(
    public sessionUserObject: SessionUserService,
    private sideMenuService: SideMenuService,
  ) {}

  ngOnInit() {
    this.initializeMenu();
  }

  initializeMenu() {
    this.items = routes.map(item => {
      item.isVisible = this.validateSideMenuItemsStatus(item.name);
      item.showForRole = this.validateSideMenuRolesAllowed(item);
      item.showSubmenu = false;
      if (item.hasOwnProperty('subItems')) {
        item.subItems = item.subItems.map((subItem: any) => {
          subItem.isVisible = this.validateSideMenuItemsStatus(subItem.name);
          subItem.showForRole = this.validateSideMenuRolesAllowed(subItem);
          subItem.showSubmenu = false;
          if (subItem.hasOwnProperty('subItems')) {
            subItem.subItems = subItem.subItems.map((subItem: any) => {
              subItem.isVisible = this.validateSideMenuItemsStatus(subItem.name);
              subItem.showForRole = this.validateSideMenuRolesAllowed(subItem);
              subItem.showSubmenu = false;
              return subItem;
            });
          }
          return subItem;
        });
      }
      return item;
    });
  }

  validateSideMenuRolesAllowed(item: any): boolean {
    if (item.onlyClient) {
      return this.sessionUserObject.userLogged.dataUser.role === 'Cliente';
    } else if (item.onlyEmpleado) {
      return this.sessionUserObject.userLogged.dataUser.role === 'Empleado';
    } else if (item.onlyAdministrador) {
      return this.sessionUserObject.userLogged.dataUser.role === 'Administrador';
    } else if (item.onlySuperAdmin) {
      return this.sessionUserObject.userLogged.dataUser.role === 'Super Admin';
    }
    return false;
  }

  validateSideMenuItemsStatus(itemName: string): Observable<boolean> {
    return of(true);
  }
}
