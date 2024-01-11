import { Injectable, inject } from '@angular/core';
import { ProfileUser } from '../Models/user';
import { Observable, from, of, switchMap } from 'rxjs';
import {
  Firestore,
  doc,
  docData,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  authService = inject(AuthService);
  firestore = inject(Firestore);
  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  addUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }
}
