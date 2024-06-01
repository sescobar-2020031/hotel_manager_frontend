import { NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';

//Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent as NavbarComponentLoggedOut } from './layout/logged-out/components/navbar/navbar.component';
import { NavbarComponent as NavbarComponentLoggedIn } from './layout/logged-in/components/navbar/navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FooterComponent } from './layout/logged-out/components/footer/footer.component';

//Interceptors
import { ErrorInterceptor } from './core/interceptors/managementErrors.interceptor';
import { AddAditionalInfoInterceptor } from './core/interceptors/addAditionalInfo.interceptor';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CoreModule } from './core/core.module';
import { SideMenuContentComponent } from './layout/logged-in/components/sidebar/content/side-menu-content.component';
import { SharedModule } from './shared/shared.module';
import { SideMenuService } from './layout/logged-in/services/side-menu.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NavbarComponentLoggedOut,
    NavbarComponentLoggedIn,
    FooterComponent,
    SideMenuContentComponent,
    HttpClientModule,
    CoreModule,
    SharedModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: APP_BASE_HREF,
      useValue: `${environment.BASE_URL}`,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddAditionalInfoInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    // Side Menu Component
    SideMenuService
  ]
})
export class AppModule { }
