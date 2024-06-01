import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionUserService } from './services/session-user.service';
import { IsLoggedPipe } from './pipes/get-is-logged.pipe';

@NgModule({
  declarations: [
    IsLoggedPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IsLoggedPipe
  ],
  providers: [
    // Session store
    SessionUserService,
  ]
})
export class CoreModule { }
