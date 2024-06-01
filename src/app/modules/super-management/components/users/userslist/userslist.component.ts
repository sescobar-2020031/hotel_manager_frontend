import { Component } from '@angular/core';
import { User } from '../../../models/user.interface';
import { UserService } from '../../../services/user.service';
import { SessionUserService } from '../../../../../core/services/session-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hotelmger-userslist',
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.scss'
})
export class UserslistComponent {
  loading: boolean = false;
  usersList: Array<User> = [];

  constructor(
    public userService: UserService,
    public sessionUserService: SessionUserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.loadData();
  }

  loadData() {
    this.userService.getUsersList().subscribe({
      next: (response) => {
        this.usersList = response.users;
        this.loading = true;
      },
      complete: () => {
        this.loading = false;
      },
      error: (err) => {
        if (err.error.showMessageError) {
          this.sessionUserService.detachFailureDialog(
            'Error obteniendo usuarios',
            err.error.message || 'Error obteniendo usuarios, intenta más tarde'
          )
        }
        this.loading = false;
      }
    })
  }

  redictToAdd(){
    this.router.navigate(['/super/useradd']);
  }
}
