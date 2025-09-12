import { DepartmentService } from './../../../services/department.service';
import { Department } from './../../../models/departments';
import { Component } from '@angular/core';
import { DepartmentComponent } from '../department/department.component';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { JobComponent } from '../job/job.component';
import { UserComponent } from '../user/user.component';
import { User } from '../../../models/users';
import { Job } from '../../../models/jobs';
import { JobService } from '../../../services/job.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [DepartmentComponent, FooterComponent, JobComponent, UserComponent, NavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  users: User[] = [];
  jobs: Job[] = [];
  constructor(private jobService: JobService, private departmentService: DepartmentService, private userService: UserService) {
  }

}
