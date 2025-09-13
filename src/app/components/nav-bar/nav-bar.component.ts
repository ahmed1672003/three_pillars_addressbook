import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/users';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  user: User | null = null;
  streamUrl: string | null;
  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    this.streamUrl = environment.streamUrl
  }
  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (response) => {
          this.user = response.result;
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        }
      });
    }
  }
  logout() {
    this.authService.clearToken();
    this.authService.clearUserId();
    this.router.navigateByUrl("/auth");
  }
}





