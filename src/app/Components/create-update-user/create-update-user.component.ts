import { Component, OnInit, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomBtnComponent } from '../custom-btn/custom-btn.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-update-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    CustomBtnComponent,
  ],
  templateUrl: './create-update-user.component.html',
  styleUrl: './create-update-user.component.scss',
})
export class CreateUpdateUserComponent implements OnInit {
  users = inject(UsersService);
  snackBar = inject(MatSnackBar);
  formBuilder = inject(FormBuilder);
  dialogData = inject(MAT_DIALOG_DATA);
  user = inject(UserService);
  auth = inject(AuthService);
  router = inject(Router);

  showAlert = false;
  close = false;
  createOrUpdateForm!: FormGroup;

  loading = false;
  constructor(public dialogRef: MatDialogRef<CreateUpdateUserComponent>) {}
  ngOnInit() {
    this.createOrUpdateForm = this.formBuilder.group({
      displayName: [null, [Validators.required, Validators.minLength(7)]],
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
    if (this.dialogData?.user) {
      this.createOrUpdateForm.setValue(
        {
          displayName: this.dialogData.user.displayName ?? '',
          phone: this.dialogData.user.customClaims.phone ?? '',
          password: this.dialogData.user.password ?? '',
          email: this.dialogData.user.email ?? '',
        },
        { onlySelf: true }
      );
    }
  }

  get email() {
    return this.createOrUpdateForm.get('email');
  }
  get name() {
    return this.createOrUpdateForm.get('displayName');
  }
  get phone() {
    return this.createOrUpdateForm.get('phone');
  }
  get password() {
    return this.createOrUpdateForm.get('password');
  }

  submit() {
    const { displayName, email, password, phone } =
      this.createOrUpdateForm.value;
    if (!this.createOrUpdateForm.valid || !displayName || !password || !email) {
      return;
    }
    this.loading = true;
    if (!this.dialogData?.user) {
      this.users.createUser({ ...this.createOrUpdateForm.value }).subscribe({
        next: () => {
          this.openSnackBar('successfully created', 'snackbar-success');
          this.dialogRef.close();
        },
        error: (error: any) => {
          this.openSnackBar(error?.message, 'snackbar-error');
        },
      });
      this.loading = false;
    } else {
      this.loading = true;
      this.users
        .updateUser(this.dialogData.user.uid, {
          ...this.createOrUpdateForm.value,
        })
        .subscribe({
          next: () => {
            this.openSnackBar('successfully updated', 'snackbar-success');
            this.dialogRef.close();
          },
          error: (error: any) => {
            this.openSnackBar(error?.message, 'snackbar-error');
          },
        });
      this.loading = false;
    }
  }

  openSnackBar(data: string, className: string) {
    this.snackBar.open(data, 'Close', {
      duration: 2000,
      panelClass: className,
    });
  }
}
