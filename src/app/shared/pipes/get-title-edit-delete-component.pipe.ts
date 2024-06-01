import { Pipe, PipeTransform } from '@angular/core';

export enum Action {
  EDIT = "EDIT",
  DELETE = "DELETE"
}

@Pipe({
  name: 'getTitleEditDeleteComponent'
})
export class GetTitleEditDeleteComponentPipe implements PipeTransform {

  transform(value: Action, currentComponent: string): string {
    if (value === Action.EDIT) {
      return `Editar ${currentComponent}`;
    } else if (value === Action.DELETE) {
      return `Eliminar ${currentComponent}`;
    } else {
      return '';
    }
  }
}
