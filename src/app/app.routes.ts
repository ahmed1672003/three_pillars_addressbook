import { Routes, CanActivateFn } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from '../guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

export const routes: Routes = [
  { path: '', component: RegisterComponent, pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent, }
];
