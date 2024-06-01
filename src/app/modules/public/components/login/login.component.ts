import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionUserService } from '../../../../core/services/session-user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticationRequest } from '../../models/authentication.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'hotelmger-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    public sessionUserService: SessionUserService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: '',
      password: ''
    });
  }

  login() {
    this.loading = true;
    const authReq: AuthenticationRequest = this.form.getRawValue();
    this.authenticationService.authenticateUser(authReq)
      .subscribe({
        next: (resp) => {
          this.sessionUserService.userLogged = resp;
          this.sessionUserService.setLoggedIn(true);
          this.sessionUserService.initApplicationLogin();
          this.loading = false;
          if (this.sessionUserService.userLogged.dataUser.role === 'Cliente') {
            this.router.navigate(['/client/home']);
          } else if (this.sessionUserService.userLogged.dataUser.role === 'Empleado') {
            this.router.navigate(['/hotel/home']);
          } else if (this.sessionUserService.userLogged.dataUser.role === 'Administrador') {
            this.router.navigate(['/hotel/home']);
          } else if (this.sessionUserService.userLogged.dataUser.role === 'Super Admin') {
            this.router.navigate(['/super/home']);
          } else {
            this.sessionUserService.detachFailureDialog(
              'Usuario Invalido',
              'Role invalido, por favor revisar.'
            )
          }
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          if (err.error.showMessageError) {
            this.sessionUserService.detachFailureDialog(
              'Error en la autenticación',
              err.error.message || 'Error intentando autenticar, intenta más tarde'
            ).subscribe(() => {
              this.router.navigate(['/home/login']);
            });
          }
        }
      })
  }
}
