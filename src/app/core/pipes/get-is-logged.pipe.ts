import { Pipe, PipeTransform } from '@angular/core';
import { SessionUserService } from '../services/session-user.service';

@Pipe({
  name: 'isLogged'
})
export class IsLoggedPipe implements PipeTransform {

  constructor(private sessionUserService: SessionUserService) {}

  transform(originBy: string | null): boolean {
    return this.sessionUserService.isLoggedIn;
  }
}
