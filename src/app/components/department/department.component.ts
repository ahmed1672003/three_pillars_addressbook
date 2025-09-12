import { Component, OnInit } from '@angular/core';
import { Department } from '../../../models/departments';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-department',
  imports: [],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {

  departments: Department[] = [];
  constructor(private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.departmentService.paginateDepartments(1, 100).subscribe({
      next: (response) => {
        this.departments = response.result;
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
      }
    });
  }
}
