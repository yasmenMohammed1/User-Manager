import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { AuthLayoutComponent } from './Pages/Layouts/auth-layout/auth-layout.component';
import { RegisterComponent } from './Pages/register/register.component';
import {
  redirectLoggedInTo,
  redirectUnauthorizedTo,
  canActivate,
} from '@angular/fire/auth-guard';
import { UserLayoutComponent } from './Pages/Layouts/user-layout/user-layout.component';
import { UsersComponent } from './Pages/users/users.component';
import { UserProfileComponent } from './Pages/user-profile/user-profile.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/dashboard']);
export const routes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },

      { path: 'dashboard', component: UsersComponent },
      {
        title: 'Profile',
        path: 'profile',
        component: UserProfileComponent,
      },
    ],
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        title: 'Login',
        component: LoginComponent,
        ...canActivate(redirectLoggedInToHome),
      },
      {
        path: 'register',
        title: 'register',
        component: RegisterComponent,
        ...canActivate(redirectLoggedInToHome),
      },
    ],
  },
];
