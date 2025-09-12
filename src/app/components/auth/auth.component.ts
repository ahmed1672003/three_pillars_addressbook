import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { tick } from '@angular/core/testing';
import { AuthRequest } from '../../../models/users';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  loginUserForm: FormGroup;
  authRequest: AuthRequest = {} as AuthRequest;
  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
    this.loginUserForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  navigateToRegister() {
    this.router.navigateByUrl("/");
  }

  login() {
    this.authRequest.email = this.loginUserForm.value.email;
    this.authRequest.password = this.loginUserForm.value.password;
    this.userService.loginUser(this.authRequest).subscribe({
      next: (response) => {
        this.authService.setToken(response.result.accessToken)
        this.router.navigateByUrl("/home");
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
