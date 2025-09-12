import { Component } from '@angular/core';
import { Job } from '../../../models/jobs';
import { JobService } from '../../../services/job.service';

@Component({
  selector: 'app-job',
  imports: [],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent {

  jobs: Job[] = [];
  constructor(private jobService: JobService) {
  }

  ngOnInit(): void {
    this.jobService.paginateJobs(1, 100).subscribe({
      next: (response) => {
        this.jobs = response.result;
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
      }
    });
  }
}
