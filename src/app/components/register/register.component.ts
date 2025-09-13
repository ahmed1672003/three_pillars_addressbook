import { AppComponent } from './../../app.component';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { RegisterUserRequest } from './../../../models/users';
import { FormControl, FormGroup, NgControlStatusGroup, ReactiveFormsModule } from '@angular/forms';
import { JobService } from './../../../services/job.service';
import { DepartmentService } from '../../../services/department.service';
import { Department } from './../../../models/departments';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Job } from '../../../models/jobs';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { StreamService } from '../../../services/stream.service';
import { tick } from '@angular/core/testing';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  departments: Department[] = [];
  jobs: Job[] = [];
  newUserForm: FormGroup;
  photoUrl: string = "";
  registerUserRequest: RegisterUserRequest = {} as RegisterUserRequest;
  constructor(private router: Router, private authService: AuthService, private streamService: StreamService, private userService: UserService, private departmentService: DepartmentService, private jobService: JobService) {
    if (authService.isAuthenticated()) {
      this.router.navigateByUrl("/home");
    }
    this.newUserForm = new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmedPassword: new FormControl(''),
      jobId: new FormControl(''),
      departmentId: new FormControl(''),
      address: new FormControl(''),
      photo: new FormControl(''),
      dateOfBirth: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.departmentService.paginateDepartments(1, 100).subscribe({
      next: (response) => {
        this.departments = response.result;
        console.log('Departments:', this.departments);
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
      }
    });

    this.jobService.paginateJobs(1, 100).subscribe({
      next: (response) => {
        this.jobs = response.result;
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.streamService.uploadStream(file).subscribe({
        next: (response) => {
          this.photoUrl = response.result.url;
        },
        error: (err) => {
          console.error('Error uploading file:', err);;
        }
      });
    }
  }

  register() {
    this.registerUserRequest.fullName = this.newUserForm.value.name;
    this.registerUserRequest.email = this.newUserForm.value.email;
    this.registerUserRequest.password = this.newUserForm.value.password;
    this.registerUserRequest.confirmedPassword = this.newUserForm.value.confirmedPassword;
    this.registerUserRequest.address = this.newUserForm.value.address;
    this.registerUserRequest.phone = this.newUserForm.value.phone;
    this.registerUserRequest.jobId = this.newUserForm.value.jobId;
    this.registerUserRequest.departmentId = this.newUserForm.value.departmentId;
    this.registerUserRequest.photoUrl = this.photoUrl;
    this.registerUserRequest.dateOfBirth = new Date(this.newUserForm.value.dateOfBirth)
    this.userService.registerUser(this.registerUserRequest).subscribe({
      next: (response) => {
        if (response.success) {

          this.authService.setToken(response.result.accessToken);
          this.authService.setUserId(response.result.userId);
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

  navigateToLogin() {
    this.router.navigateByUrl("/auth");
  }
}
