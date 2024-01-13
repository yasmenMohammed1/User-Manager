import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UsersService } from '../../services/users.service';

import { User } from 'firebase/auth';
import { CustomBtnComponent } from '../../Components/custom-btn/custom-btn.component';
import { UidIdentifier } from 'firebase-admin/lib/auth/identifier';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateUserComponent } from '../../Components/create-update-user/create-update-user.component';
import { ProfileUser } from '../../Models/user';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, CommonModule, CustomBtnComponent],

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['email', 'displayName', 'phone', 'actions'];
  dataSource: User[] = [];
  loader: { id: UidIdentifier | null; loading: boolean } = {
    id: null,
    loading: false,
  };
  isDeleteLoading = false;
  isEditLoading = false;
  dialog = inject(MatDialog);
  users = inject(UsersService);

  constructor() {}
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers = () => {
    return this.users.getUsers().subscribe((res) => {
      this.dataSource = res.users;
    });
  };
  createUser() {
    this.dialog.open(CreateUpdateUserComponent, {
      data: {},
      width: '70%',
    });
  }

  updateUser(user: Partial<ProfileUser>) {
    this.dialog.open(CreateUpdateUserComponent, {
      data: { user },
      width: '70%',
    });
  }
  deleteUser(uid: UidIdentifier) {
    this.loader = { id: uid, loading: true };
    this.users.deleteUser(uid).subscribe({
      next: (res) => {
        this.isDeleteLoading = false;
        this.getAllUsers();
      },
      error: (res) => (this.isDeleteLoading = false),
    });
  }
}
