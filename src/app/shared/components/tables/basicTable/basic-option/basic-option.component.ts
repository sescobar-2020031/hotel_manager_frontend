import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Alignment, FilterType, getSeverityOptions } from '../models/table.interface';

@Component({
  selector: 'basic-option',
  templateUrl: './basic-option.component.html',
  styleUrls: ['./basic-option.component.scss']
})
export class BasicOptionComponent {
  @Input() headerLabel!: string;
  @Input() headerAlign: Alignment = 'left';
  @Input() headerId!: string;
  @Input() keyValue!: string;
  @Input() styleTitleHeader?: string;
  @Input() filterPlaceHolder?: string;
  @Input() filterType?: FilterType;
  @Input() filterOptions?: string[];
  @Input() filterFractionDigits: number = 0;
  @Input() valueAlign: Alignment = 'left';
  @Input() getSeverityOptions?: getSeverityOptions;
  @Input() setFormatValue?: any;
  @Input() image?: string;
  @Input() buttonIcon?: string;
  @Input() toolTipButtonIcon?: string;

  @Output() onClick = new EventEmitter<any>();

  handleClickButton(item: any, event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.onClick.emit(item);
  }
}
