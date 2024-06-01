import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getValue'
})
export class GetValuePipe implements PipeTransform {

  transform(item: any, keyValue: string, formatFn?: Function): any {
    let keys = keyValue.split('.');
    let value = item;

    for (let key of keys) {
        if (value?.hasOwnProperty(key)) {
            value = value[key];
        } else {
            value = null;
            break;
        }
    }

    if (formatFn) {
        value = formatFn(item, value);
    }

    return value;
  }
}
