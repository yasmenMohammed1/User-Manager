import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CustomBtnComponent } from '../../Components/custom-btn/custom-btn.component';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CustomBtnComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false;
  auth = inject(AuthService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  user = inject(UserService);
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  submit() {
    const { email, password } = this.loginForm.value;
    if (!this.loginForm.valid || !email || !password) {
      return;
    }
    this.loading = true;

    this.auth.Login(email, password).subscribe(
      () => {
        this.loading = false;
        this.openSnackBar(
          ` Welcome  ${this.auth.auth.currentUser?.displayName}`,
          'snackbar-success'
        );
        this.router.navigateByUrl('/dashboard');
      },
      (error: any) => {
        this.loading = false;
        this.openSnackBar(error?.message, 'snackbar-error');
      }
    );
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  handleNavigation() {
    this.router.navigate(['register']);
  }

  openSnackBar(data: string, className: string) {
    this.snackBar.open(data, 'Close', {
      duration: 20000,
      panelClass: className,
    });
  }
}
