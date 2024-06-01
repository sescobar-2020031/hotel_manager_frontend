import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SessionUserService } from './core/services/session-user.service';
import { PrimeNGConfig } from 'primeng/api';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDrawerMode } from '@angular/material/sidenav';
import { SideMenuService } from './layout/logged-in/services/side-menu.service';

@Component({
  selector: 'hotelmger-root',
  templateUrl: './app.component.html',
  styleUrl: './styles/app.scss'
})
export class AppComponent implements AfterViewInit, OnInit {
  // Sidebar
  @ViewChild('drawerContainer') drawerContainer: any;
  @ViewChild('sideMenu') sideMenu: any;
  open_menu = true;
  mode: MatDrawerMode = "side";

  public isLoggedIn: boolean = false;

  constructor(
    public sessionUserService: SessionUserService,
    private config: PrimeNGConfig,
    private deviceService: DeviceDetectorService,
    private sideMenuService: SideMenuService
  ) {}

  ngOnInit(): void {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    if (isMobile || isTablet) {
      this.open_menu = false;
      this.mode = "over";
    }

    this.sessionUserService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    
    this.config.setTranslation({
      "startsWith": "Comience con",
      "contains": "Contenga",
      "notContains": "No contenga",
      "endsWith": "Termine con",
      "equals": "Igual a",
      "notEquals": "Diferente a",
      "noFilter": "Sin filtro",
      "lt": "Menor que",
      "lte": "Menor o igual a",
      "gt": "Mayor que",
      "gte": "Mayor o igual a",
      "dateIs": "Fecha igual a",
      "dateIsNot": "Fecha diferente a",
      "dateBefore": "Fecha antes de",
      "dateAfter": "Fecha después de",
      "clear": "Limpiar",
      "apply": "Aplicar",
      "matchAll": "Coincidir todo",
      "matchAny": "Coincidir con cualquiera",
      "addRule": "Agregar regla",
      "removeRule": "Eliminar regla",
      "accept": "Sí",
      "reject": "No",
      "choose": "Escoger",
      "upload": "Subir",
      "cancel": "Cancelar",
      "dayNames": [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
      ],
      "dayNamesShort": [
        "Dom",
        "Lun",
        "Mar",
        "Mié",
        "Jue",
        "Vie",
        "Sáb"
      ],
      "dayNamesMin": [
        "D",
        "L",
        "M",
        "M",
        "J",
        "V",
        "S"
      ],
      "monthNames": [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],
      "monthNamesShort": [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
      ],
      "today": "Hoy",
      "weekHeader": "Sem",
      "firstDayOfWeek": 1,
      "dateFormat": "dd/mm/yy",
      "weak": "Débil",
      "medium": "Medio",
      "strong": "Fuerte",
      "emptyFilterMessage": "Sin opciones disponibles",
      "emptySearchMessage": "Sin opciones disponibles",
      "emptyMessage": "No se han encontrado resultados",
      "aria": {
        "trueLabel": "Verdadero",
        "falseLabel": "Falso",
        "nullLabel": "No seleccionado",
        "star": "1 estrella",
        "stars": "{star} estrellas",
        "selectAll": "Seleccionar todos",
        "unselectAll": "Deseleccionar todos",
        "close": "Cerrar",
        "previous": "Anterior",
        "next": "Siguiente",
        "navigation": "Navegación",
        "scrollTop": "Desplazarse hacia arriba",
        "moveTop": "Mover arriba",
        "moveUp": "Subir",
        "moveDown": "Bajar",
        "moveBottom": "Desplazarse hacia abajo",
        "moveToTarget": "Mover al objetivo",
        "moveToSource": "Mover al origen",
        "moveAllToTarget": "Mover todo al objetivo",
        "moveAllToSource": "Mover todo al origen",
        "pageLabel": "Página {page}",
        "firstPageLabel": "Primera Página",
        "lastPageLabel": "Última Página",
        "nextPageLabel": "Siguiente Página",
        "previousPageLabel": "Página Anterior",
        "rowsPerPageLabel": "Filas por página",
        "jumpToPageDropdownLabel": "Ir al menú desplegable de página",
        "jumpToPageInputLabel": "Ir a la entrada de página",
        "selectRow": "Seleccionar fila",
        "unselectRow": "Desmarcar fila",
        "expandRow": "Expandir Fila",
        "collapseRow": "Reducir Fila",
        "showFilterMenu": "Mostrar menú del filtro",
        "hideFilterMenu": "Ocultar menú del filtro",
        "filterOperator": "Operador de filtro",
        "filterConstraint": "Restricción de filtro",
        "editRow": "Editar fila",
        "saveEdit": "Guardar editado",
        "cancelEdit": "Cancelar editado",
        "listView": "Vista de lista",
        "gridView": "Vista de cuadrícula",
        "slide": "Deslizar",
        "slideNumber": "{slideNumber}",
        "zoomImage": "Ampliar imagen",
        "zoomIn": "Ampliar",
        "zoomOut": "Reducir",
        "rotateRight": "Girar a la derecha",
        "rotateLeft": "Girar a la izquierda"
      }
    });
  }

  ngAfterViewInit(): void {
    console.log(this.sideMenu);
    console.log(this.drawerContainer);
    this.sideMenuService.sidenav = this.sideMenu;
    this.sideMenuService.drawerContainer = this.drawerContainer;
  }
}
