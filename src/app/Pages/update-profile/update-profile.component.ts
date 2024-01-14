import { Component, inject } from '@angular/core';
import { User, getAuth, updateProfile } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileUser } from '../../Models/user';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CustomBtnComponent } from '../../Components/custom-btn/custom-btn.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    CommonModule,
    CustomBtnComponent,
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss',
})
export class UpdateProfileComponent {
  user = inject(UserService);
  router = inject(Router);
  auth = inject(AuthService);
  updateProfileForm!: FormGroup;
  loading = false;
  userData: ProfileUser | null | undefined;

  updateCurrentUser() {
    updateProfile(
      getAuth().currentUser as User,
      {
        displayName: 'narya',
      } as User
    ).then(() => {
      this.user.updateUser({
        ...this.userData,
        displayName: 'nayra',
      } as ProfileUser);
      this.user.currentUserProfile$.subscribe((user) => {
        this.userData = user;

        console.log('userData', user);
      });
    });
    console.log('user');
  }
  get email() {
    return this.updateProfileForm.get('email');
  }
  get name() {
    return this.updateProfileForm.get('name');
  }
  get phone() {
    return this.updateProfileForm.get('phone');
  }
  get password() {
    return this.updateProfileForm.get('password');
  }
}
