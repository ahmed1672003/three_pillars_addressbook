import { AuthService } from './../../../services/auth.service';
import { DepartmentService } from './../../../services/department.service';
import { Department, CreateDepartmentRequest, UpdateDepartmentRequest } from './../../../models/departments';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { User } from '../../../models/users';
import { Job, CreateJobRequest, UpdateJobRequest } from '../../../models/jobs';
import { JobService } from '../../../services/job.service';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FooterComponent, NavBarComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  jobs: Job[] = [];
  departments: Department[] = [];
  streamUrl: string = "";

  currentPage = 1;
  pageSize = 10;
  totalUsers = 0;
  totalPages = 0;
  moveNext = false;
  movePrevious = false;

  Math = Math;

  showJobForm = false;
  editingJob: Job | null = null;
  jobForm = {
    title: ''
  };

  showDepartmentForm = false;
  editingDepartment: Department | null = null;
  departmentForm = {
    name: ''
  };

  constructor(private authService: AuthService, private jobService: JobService, private departmentService: DepartmentService, private userService: UserService, private router: Router) {
    this.streamUrl = environment.streamUrl;
  }

  ngOnInit(): void {
    this.loadJobs();
    this.loadDepartments();
    this.loadUsers();
  }

  loadJobs(): void {
    this.jobService.paginateJobs(1, 100).subscribe({
      next: (response) => {
        this.jobs = response.result;
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
      }
    });
  }

  showAddJobForm(): void {
    this.editingJob = null;
    this.jobForm = { title: '' };
    this.showJobForm = true;
  }

  showEditJobForm(job: Job): void {
    this.editingJob = job;
    this.jobForm = { title: job.title };
    this.showJobForm = true;
  }

  saveJob(): void {
    if (this.editingJob) {
      const updateRequest: UpdateJobRequest = {
        id: this.editingJob.id,
        title: this.jobForm.title
      };
      this.jobService.updateJob(updateRequest).subscribe({
        next: (response) => {
          console.log('Job updated successfully:', response);
          this.loadJobs();
          this.cancelJobForm();
        },
        error: (error) => {
          console.error('Error updating job:', error);
        }
      });
    } else {
      const createRequest: CreateJobRequest = {
        title: this.jobForm.title
      };
      this.jobService.addJob(createRequest).subscribe({
        next: (response) => {
          console.log('Job created successfully:', response);
          this.loadJobs();
          this.cancelJobForm();
        },
        error: (error) => {
          console.error('Error creating job:', error);
        }
      });
    }
  }

  deleteJob(job: Job): void {
    if (confirm(`Are you sure you want to delete the job "${job.title}"?`)) {
      this.jobService.deleteDapartmentById(job.id).subscribe({
        next: (response) => {
          console.log('Job deleted successfully:', response);
          this.loadJobs();
        },
        error: (error) => {
          console.error('Error deleting job:', error);
        }
      });
    }
  }

  cancelJobForm(): void {
    this.showJobForm = false;
    this.editingJob = null;
    this.jobForm = { title: '' };
  }

  loadDepartments(): void {
    this.departmentService.paginateDepartments(1, 100).subscribe({
      next: (response) => {
        this.departments = response.result;
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
      }
    });
  }

  showAddDepartmentForm(): void {
    this.editingDepartment = null;
    this.departmentForm = { name: '' };
    this.showDepartmentForm = true;
  }

  showEditDepartmentForm(department: Department): void {
    this.editingDepartment = department;
    this.departmentForm = { name: department.name };
    this.showDepartmentForm = true;
  }

  saveDepartment(): void {
    if (this.editingDepartment) {
      const updateRequest: UpdateDepartmentRequest = {
        id: this.editingDepartment.id,
        name: this.departmentForm.name
      };
      this.departmentService.updateDepartment(updateRequest).subscribe({
        next: (response) => {
          console.log('Department updated successfully:', response);
          this.loadDepartments();
          this.cancelDepartmentForm();
        },
        error: (error) => {
          console.error('Error updating department:', error);
        }
      });
    } else {
      const createRequest: CreateDepartmentRequest = {
        name: this.departmentForm.name
      };
      this.departmentService.addDepartment(createRequest).subscribe({
        next: (response) => {
          console.log('Department created successfully:', response);
          this.loadDepartments();
          this.cancelDepartmentForm();
        },
        error: (error) => {
          console.error('Error creating department:', error);
        }
      });
    }
  }

  deleteDepartment(department: Department): void {
    if (confirm(`Are you sure you want to delete the department "${department.name}"?`)) {
      this.departmentService.deleteDepartmentById(department.id).subscribe({
        next: (response) => {
          console.log('Department deleted successfully:', response);
          this.loadDepartments();
        },
        error: (error) => {
          console.error('Error deleting department:', error);
        }
      });
    }
  }

  cancelDepartmentForm(): void {
    this.showDepartmentForm = false;
    this.editingDepartment = null;
    this.departmentForm = { name: '' };
  }

  // Users operations
  loadUsers(page: number = this.currentPage): void {
    this.userService.getPaginatedUsers(page, this.pageSize).subscribe({
      next: (response) => {
        this.users = response.result;
        this.totalUsers = response.totalCount || response.result.length;
        this.totalPages = response.totalPages || Math.ceil(this.totalUsers / this.pageSize);
        this.currentPage = response.pageIndex || page;
        this.moveNext = response.moveNext !== undefined ? response.moveNext : this.currentPage < this.totalPages;
        this.movePrevious = response.movePrevious !== undefined ? response.movePrevious : this.currentPage > 1;

        // Ensure minimum values for pagination
        if (this.totalPages === 0 && this.users.length > 0) {
          this.totalPages = 1;
        }
        if (this.totalUsers === 0 && this.users.length > 0) {
          this.totalUsers = this.users.length;
        }

        // Debug logging
        console.log('Pagination Debug:', {
          totalUsers: this.totalUsers,
          totalPages: this.totalPages,
          currentPage: this.currentPage,
          moveNext: this.moveNext,
          movePrevious: this.movePrevious,
          usersCount: this.users.length,
          pageSize: this.pageSize,
          fullResponse: response
        });
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  // Pagination methods
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadUsers(page);
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.loadUsers(1);
  }

  setPageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.loadUsers(1);
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  goToFirstPage(): void {
    this.onPageChange(1);
  }

  goToLastPage(): void {
    this.onPageChange(this.totalPages);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
  deleteUser(user: User): void {
    this.userService.deleteUserById(user.id).subscribe({
      next: (response) => {
        console.log('User deleted successfully:', response);

        if (this.authService.getUserId() === user.id) {
          this.authService.clearToken();
          this.authService.clearUserId();
          this.router.navigate(['/auth']);
        } else {
          this.loadUsers();
        }
        this.loadUsers();
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }
}
