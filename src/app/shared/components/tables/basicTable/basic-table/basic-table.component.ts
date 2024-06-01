import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, Input, QueryList, ViewEncapsulation, Output, EventEmitter, ViewChild, ViewChildren, ElementRef, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';
import { BasicOptionComponent } from '../basic-option/basic-option.component';
import { TableOption } from '../models/table.interface';
import { Table } from 'primeng/table';

@Component({
  selector: 'basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BasicTableComponent implements AfterContentInit, AfterViewInit, OnChanges {
  constructor(
    private cdRef: ChangeDetectorRef,
  ) { }

  // References
  @ContentChildren(BasicOptionComponent) contentOptions!: QueryList<BasicOptionComponent>;
  basicOptions: BasicOptionComponent[] = [];
  @ViewChild('dt') dt!: Table;
  @ViewChildren('rowReference') rowsReference!: QueryList<ElementRef>;

  // Attributes
  @Input() data!: any[];
  @Input() class!: string;
  @Input() dataKey!: string;
  @Input() rows: number = 5;
  @Input() showCurrentPageReport: boolean = true;
  @Input() rowsPerPageOptions: number[] = [5, 10, 25, 50];
  @Input() laoding!: boolean;
  @Input() paginator: boolean = true;
  @Input() globalFilter!: boolean;
  @Input() globalFilterPlaceholder: string = "Filtrar";
  @Input() globalFilterFields!: string[];
  @Input() currentPageReportTemplate: string = "Mostrando {first} de {last} de {totalRecords} registros";
  @Input() scrollHeight!: string;
  @Input() authorization!: boolean;
  @Input() filters: boolean = true;
  @Input() emptymessage: string = "No se encontraron registros";

  // Variables
  selectedValues!: any[];
  options!: TableOption[];
  isDataSelected: boolean = false;

  // Events
  @Output() onChangeSelection: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAuthorize: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickRow: EventEmitter<any> = new EventEmitter<any>();

  ngAfterContentInit(): void {
    const projectedOptions = this.contentOptions.map(option => ({
      headerLabel: option.headerLabel,
      headerAlign: option.headerAlign,
      headerId: option.headerId,
      keyValue: option.keyValue,
      styleTitleHeader: option.styleTitleHeader,
      filterPlaceHolder: option.filterPlaceHolder,
      filterType: option.filterType,
      filterOptions: option.filterOptions,
      filterFractionDigits: option.filterFractionDigits,
      valueAlign: option.valueAlign,
      getSeverityOptions: option.getSeverityOptions,
      setFormatValue: option.setFormatValue,
      image: option.image,
      buttonIcon: option.buttonIcon,
      toolTipButtonIcon: option.toolTipButtonIcon,
    }));
    this.options = projectedOptions;
    this.basicOptions = this.contentOptions.toArray();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["laoding"] && !this.laoding) {
      this.updateView();
    }
    if(changes["data"]){
      this.updateView();
    }
  }

  ngAfterViewInit() {
    this.updateView();
  }

  updateView() {
    this.cdRef.detectChanges();
    this.rowsReference.forEach(rowRef => {
      const cells = rowRef.nativeElement.querySelectorAll('.cell, .p-checkbox.p-component');

      let maxHeight = 0;
      let minHeight = Infinity;

      cells.forEach((cell: any) => {
        if (cell.offsetHeight > maxHeight) {
          maxHeight = cell.offsetHeight;
        }

        if (cell.offsetHeight < minHeight) {
          minHeight = cell.offsetHeight;
        }
      });

      if (maxHeight !== minHeight) {
        cells.forEach((cell: any) => {
          cell.style.height = `${maxHeight}px`;
        });
      }
    });
  }

  changeSelection() {
    this.onChangeSelection.emit(this.selectedValues);
    this.isDataSelected = this.selectedValues.length > 0;
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  handleAuthorize(): void {
    this.onAuthorize.emit(this.selectedValues);
  }

  handleCancel(): void {
    this.onCancel.emit(this.selectedValues);
  }

  handleClickRow(item: any): void {
    this.onClickRow.emit(item);
  }

  handleClickButton(index: number, data: any, event: any){
    this.basicOptions[index].handleClickButton(data, event);
  }

  getToolTipInfomation(message: string | undefined) {
    if (message == undefined) {
      return {
        disabled: true
      };
    }
    return {
      allowHTML: true,
      content: `${message}`,
      placement: 'bottom',
      trigger: 'mouseenter',
      arrow: true,
      animation: 'scale',
      theme: 'ligth'
    };
  }
}
