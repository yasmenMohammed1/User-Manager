import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { User } from 'firebase/auth';
import { CustomBtnComponent } from '../../Components/custom-btn/custom-btn.component';
import { UidIdentifier } from 'firebase-admin/lib/auth/identifier';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateUserComponent } from '../../Components/create-update-user/create-update-user.component';
import { ProfileUser } from '../../Models/user';
import { getAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, CommonModule, CustomBtnComponent],

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  dialog = inject(MatDialog);
  users = inject(UsersService);
  snackBar = inject(MatSnackBar);

  currentUser = getAuth().currentUser?.uid;

  displayedColumns: string[] = ['email', 'displayName', 'phone', 'actions'];
  dataSource: User[] = [];

  loader: { id: UidIdentifier | null; loading: boolean } = {
    id: null,
    loading: false,
  };

  isDeleteLoading = false;
  isEditLoading = false;

  constructor() {}
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers = () => {
    return this.users.getUsers().subscribe((res) => {
      this.dataSource = res.users.filter(
        (user: ProfileUser) => user.uid != this.currentUser
      );
    });
  };

  createUser() {
    this.dialog
      .open(CreateUpdateUserComponent, {
        width: '70%',
      })
      .afterClosed()
      .subscribe({
        next: (res) => {
          this.getAllUsers();
          this.openSnackBar(
            'user has been created successfully',
            'success-snackbar'
          );
        },
        error: (error) => {
          this.openSnackBar(error.message, 'error-snackbar');
        },
      });
  }

  updateUser(user: Partial<ProfileUser>) {
    this.dialog
      .open(CreateUpdateUserComponent, {
        data: { user },
        width: '70%',
      })
      .afterClosed()
      .subscribe({
        next: () => {
          this.openSnackBar(
            'user has been updated successfully',
            'success-snackbar'
          );
          this.getAllUsers();
        },
        error: (error) => {
          this.openSnackBar(error.message, 'error-snackbar');
        },
      });
  }
  deleteUser(uid: UidIdentifier) {
    this.loader = { id: uid, loading: true };
    this.users.deleteUser(uid).subscribe({
      next: (res) => {
        this.loader = { id: uid, loading: false };
        this.openSnackBar(
          'user has been deleted successfully',
          'success-snackbar'
        );
      },
      error: (error: any) => {
        this.loader = { id: uid, loading: true };
        this.openSnackBar(error?.message, 'error-snackbar');
      },
    });
    this.users.getUsers().subscribe((res) => {
      this.dataSource = res.users.filter(
        (user: ProfileUser) => user.uid != this.currentUser
      );
    });
  }
  openSnackBar(data: string, className: string) {
    this.snackBar.open(data, 'Close', {
      duration: 20000,
      panelClass: className,
    });
  }
}
