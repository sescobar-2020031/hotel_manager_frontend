import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tooltipInfo'
})
export class GetTooltipInformationPipe implements PipeTransform {
  transform(content: string, theme?: string): any {
    return {
      content: content,
      placement: 'bottom',
      trigger: 'mouseenter',
      arrow: true,
      animation: 'scale',
      theme: theme ?? undefined
    };
  }
}
