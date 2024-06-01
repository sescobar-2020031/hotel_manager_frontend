import { Component, Input } from '@angular/core';

@Component({
  selector: 'select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent {
  @Input() value!: string;
  @Input() label!: string;
  @Input() disabled!: boolean;
  @Input() image!: string;
}
