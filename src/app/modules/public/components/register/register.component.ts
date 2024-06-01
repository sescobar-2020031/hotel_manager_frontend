import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionUserService } from '../../../../core/services/session-user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { RegisterRequest } from '../../models/authentication.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'hotelmger-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form!: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    public sessionUserService: SessionUserService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: '',
      password: '',
      role: 'Cliente',
      name: '',
      identity_document: '',
      phone: '',
      email: '',
      address: ''
    });
  }

  register() {
    this.loading = true;
    const registerReq: RegisterRequest = this.form.getRawValue();
    this.authenticationService.registerClient(registerReq)
      .subscribe({
        next: (resp) => {
          this.router.navigate(['/home/login']);
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          if (err.error.showMessageError) {
            this.sessionUserService.detachFailureDialog(
              'Error registrandote 😥',
              err.error.message || 'Error intentando registrarte, intenta más tarde'
            ).subscribe(() => {
              this.router.navigate(['/home/register']);
            });
          }
        }
      })
  }
}
