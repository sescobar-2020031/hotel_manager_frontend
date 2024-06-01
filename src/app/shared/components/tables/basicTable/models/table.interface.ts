export interface TableOption {
  headerLabel: string;
  headerAlign?: Alignment;
  headerId: string;
  keyValue: string;
  styleTitleHeader?: string;
  filterPlaceHolder?: string;
  filterType?: FilterType;
  filterOptions?: string[];
  filterFractionDigits: number;
  valueAlign: Alignment;
  getSeverityOptions?: getSeverityOptions;
  setFormatValue?: any;
  image?: string;
  buttonIcon?: string;
  toolTipButtonIcon?: string;
}

export type Alignment = 'left' | 'right' | 'center';
export type FilterType = 'text' | 'numeric' | 'select' | 'button';
export type getSeverityOptions = (arg: SeverityOptions) => SeverityOptions;
export type SeverityOptions = 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast';
