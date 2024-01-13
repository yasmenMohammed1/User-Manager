import { Component, Input, OnInit, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
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
import { subscribe } from 'diagnostics_channel';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CustomBtnComponent } from '../custom-btn/custom-btn.component';
import { FlexLayoutModule } from '@angular/flex-layout';
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
  createOrUpdateForm!: FormGroup;

  loading = false;
  ngOnInit() {
    this.createOrUpdateForm = this.formBuilder.group({
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
    if (this.dialogData.user) {
      this.createOrUpdateForm.setValue(
        {
          name: this.dialogData.user.displayName,
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
    return this.createOrUpdateForm.get('name');
  }
  get phone() {
    return this.createOrUpdateForm.get('phone');
  }
  get password() {
    return this.createOrUpdateForm.get('password');
  }

  submit() {
    const { name, email, password, phone } = this.createOrUpdateForm.value;
    if (!this.createOrUpdateForm.valid || !name || !password || !email) {
      return;
    }
    this.loading = true;
    if (this.dialogData.user) {
      this.users
        .updateUser(this.dialogData.user.uid, {
          ...this.createOrUpdateForm.value,
        })
        .subscribe({
          next: () => {
            this.loading = false;
            this.openSnackBar('successfully updated', 'snackbar-success');
          },
          error: (error: any) => {
            this.openSnackBar(error?.message, 'snackbar-error');
            this.loading = false;
          },
        });
    } else {
      this.users.createUser({ ...this.createOrUpdateForm.value }).subscribe({
        next: () => {
          this.loading = false;
          this.openSnackBar('successfully created', 'snackbar-success');
        },
        error: (error: any) => {
          this.openSnackBar(error?.message, 'snackbar-error');
          this.loading = false;
        },
      });
    }
  }

  openSnackBar(data: string, className: string) {
    this.snackBar.open(data, 'Close', {
      duration: 2000,
      panelClass: className,
    });
  }
}
