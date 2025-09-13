import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { tick } from '@angular/core/testing';
import { AuthRequest } from '../../../models/users';
import Swal from 'sweetalert2';

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
        if (response.success) {

          this.authService.setToken(response.result.accessToken)
          this.authService.setUserId(response.result.userId)
          this.router.navigateByUrl("/home");
        } else {
          Swal.fire({
            title: 'Error',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
}
