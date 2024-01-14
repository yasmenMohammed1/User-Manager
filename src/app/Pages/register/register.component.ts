import { UserService } from './../../services/user.service';
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
import { CustomBtnComponent } from '../../Components/custom-btn/custom-btn.component';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CustomBtnComponent,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  snackBar = inject(MatSnackBar);
  formBuilder = inject(FormBuilder);
  auth = inject(AuthService);
  usersService = inject(UserService);
  router = inject(Router);
  signUpForm!: FormGroup;
  loading = false;

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(7)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
          ),
        ],
      ],
      password: ['', Validators.required],
    });
  }
  submit() {
    console.log('this.', this.signUpForm.errors);
    const { name, email, password, phone } = this.signUpForm.value;
    if (!this.signUpForm.valid || !name || !password || !email) {
      return;
    }
    this.loading = true;
    this.auth
      .Signup(email, password)
      .pipe(
        switchMap(({ user }) => {
          return this.usersService.addUser({
            uid: user.uid,
            email,
            phone,
            displayName: name,
          });
        })
      )
      .subscribe({
        next: (user: any) => {
          this.loading = false;
          this.openSnackBar(
            'Welcome' + ' ' + user?.displayName,
            'snackbar-success'
          );
          this.router.navigateByUrl('/login');
        },
        error: (error: any) => {
          this.openSnackBar(error?.message, 'snackbar-error');
          this.loading = false;
        },
      });
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get name() {
    return this.signUpForm.get('name');
  }
  get phone() {
    return this.signUpForm.get('phone');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  register() {
    this.loading = true;

    this.auth
      .Signup(this.signUpForm.value.email, this.signUpForm.value.password)
      .subscribe({
        next: (user) => {
          this.loading = false;
        },
      });
  }
  openSnackBar(data: string, className: string) {
    this.snackBar.open(data, 'Close', {
      duration: 2000,
      panelClass: className,
    });
  }
}
