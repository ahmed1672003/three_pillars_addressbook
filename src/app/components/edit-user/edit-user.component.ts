import { routes } from './../../app.routes';
import { StreamService } from './../../../services/stream.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './../../../services/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUserRequest, User } from '../../../models/users';
import { DepartmentService } from '../../../services/department.service';
import { JobService } from '../../../services/job.service';
import { Department } from '../../../models/departments';
import { Job } from '../../../models/jobs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  @Input() userId!: number;
  departments: Department[] = [];
  jobs: Job[] = [];
  updateUserRequest: UpdateUserRequest = {} as UpdateUserRequest;
  editedUserForm: FormGroup = {} as FormGroup;
  user: User = {} as User;
  photoUrl: string = "";
  constructor(private router: Router, private departmentService: DepartmentService, private jobService: JobService, private streamService: StreamService, private userService: UserService, private activetedRouter: ActivatedRoute) {

  }
  ngOnInit(): void {
    //var userId = Number(this.activetedRouter?.snapshot.paramMap.get('id')!);
    this.userService.getUserById(this.userId).subscribe({
      next: (response) => {
        this.user = response.result;
        this.photoUrl = this.user.photoUrl;
        this.editedUserForm = new FormGroup({
          name: new FormControl(this.user.fullName),
          phone: new FormControl(this.user.phone),
          email: new FormControl(this.user.email),
          jobId: new FormControl(this.user.job.id),
          departmentId: new FormControl(this.user.department.id),
          address: new FormControl(this.user.address),
          photo: new FormControl(''),
          dateOfBirth: new FormControl(this.user.dateOfBirth),
        });
      },
      error: (err) => {
        console.log('get-user-error', err)
      }
    });

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

  updateUser() {
    this.updateUserRequest.id = this.user.id;
    this.updateUserRequest.fullName = this.editedUserForm.value.name;
    this.updateUserRequest.email = this.editedUserForm.value.email;
    this.updateUserRequest.address = this.editedUserForm.value.address;
    this.updateUserRequest.phone = this.editedUserForm.value.phone;
    this.updateUserRequest.jobId = this.editedUserForm.value.jobId;
    this.updateUserRequest.departmentId = this.editedUserForm.value.departmentId;
    this.updateUserRequest.photoUrl = this.photoUrl;
    this.updateUserRequest.dateOfBirth = new Date(this.editedUserForm.value.dateOfBirth)
    this.userService.updateUser(this.updateUserRequest).subscribe({
      next: (response) => {
        if (response.success) {
          this.closePopup(false)
        } else {
          Swal.fire({
            title: 'Error',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      },
      error: (err) => {
        console.error('Error registering user:', err);
      }
    });
  }
  cancelUpdateUser() {
    this.router.navigateByUrl("/home");
  }

  closePopup(updated: boolean = false) {
    this.close.emit(updated);
  }
}
