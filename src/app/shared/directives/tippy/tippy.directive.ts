import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import tippy from 'tippy.js';

@Directive({
  selector: '[tippy]'
})
export class TippyDirective implements OnInit {
  @Input('tippyOptions') public tippyOptions!: any;
  private el: any;
  private tippy: any = null;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngOnInit() {
    if(this.tippyOptions.disabled === undefined ){
      this.tippy = tippy(this.el, {
        ...this.tippyOptions
      });
    }
  }
}
