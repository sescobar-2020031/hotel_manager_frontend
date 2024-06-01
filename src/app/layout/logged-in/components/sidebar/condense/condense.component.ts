import { Component, Input, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'hotelmger-condense',
  templateUrl: './condense.component.html',
  styleUrls: ['./condense.component.scss'],
  standalone: true,
  imports: [SharedModule],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('condense', [
      state('condensed', style({
        width: '50px'
      })),
      state('expanded', style({
        width: '260px'
      })),
      transition('condensed => expanded', animate('100ms ease-in')),
      transition('expanded => condensed', animate('100ms ease-out'))
    ])
  ]
})
export class CondenseComponent {
  @Input() menuState = 'expanded';

  toggleState(): void {
    this.menuState = (this.menuState === 'expanded' ? 'condensed' : 'expanded');
  }
}
