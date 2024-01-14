import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Observable, defer, from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  http = inject(HttpClient);
  currentUser$ = authState(this.auth);

  Login(email: string, password: string): Observable<any> {
    const res = () => signInWithEmailAndPassword(this.auth, email, password);
    return defer(res);
  }

  Signup(email: string, password: string): Observable<UserCredential> {
    const res = () =>
      createUserWithEmailAndPassword(this.auth, email, password);
    return defer(res);
  }

  LoginGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    const res = () => signInWithPopup(this.auth, provider);
    return defer(res);
  }
  logout(): Observable<any> {
    return from(this.auth.signOut());
  }
}
