import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UidIdentifier } from 'firebase-admin/lib/auth/identifier';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { ProfileUser } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);

  constructor() {}
  getUsers(): Observable<any> {
    return this.http.get('http://localhost:10000/api/users/list');
  }

  createUser(user: Partial<ProfileUser>): Observable<any> {
    return this.http.post('http://localhost:10000/api/user', user);
  }

  updateUser(uid: UidIdentifier, user: Partial<ProfileUser>) {
    return this.http.put(`http://localhost:10000/api/user/${uid}`, {
      ...user,
    });
  }
  deleteUser(uid: UidIdentifier) {
    return this.http.delete(`http://localhost:10000/api/users/${uid}`);
  }
}
