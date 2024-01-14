import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { ProfileUser } from '../../Models/user';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CustomBtnComponent } from '../../Components/custom-btn/custom-btn.component';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    CustomBtnComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  dialog = inject(MatDialog);
  user = inject(UserService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  auth = inject(AuthService);

  userData: ProfileUser | null | undefined;

  ngOnInit() {
    this.user.currentUserProfile$.subscribe((user) => {
      this.userData = user;
    });
  }

  redirectToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
}
