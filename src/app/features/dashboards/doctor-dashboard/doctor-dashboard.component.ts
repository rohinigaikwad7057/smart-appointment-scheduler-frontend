import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent {

  todayCount = 0;
  upcomingDoctorCount = 0;
  completedDoctorCount = 0;

  role = 'doctor';

  constructor(
    private router: Router,
    public authService: AuthService,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadDoctorStats();
  }

  loadDoctorStats() {
    this.authService.getDoctorAppointments().subscribe((appts: any[]) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      this.todayCount = 0;
      this.upcomingDoctorCount = 0;
      this.completedDoctorCount = 0;

      appts.forEach(a => {
         const apptDate = new Date(a.date + 'T00:00:00');
        apptDate.setHours(0, 0, 0, 0);

        if (a.status === 'Completed') {
          this.completedDoctorCount++;
        }

        if (a.status === 'Accepted') {
          if (apptDate.getTime() === today.getTime()) {
            this.todayCount++;
          } else if (apptDate.getTime() > today.getTime()) {
            this.upcomingDoctorCount++;
          }
        }
      });
    });
  }

  goToAppointments() {
    this.router.navigate(['/doctor/appointments']);
  }

  goToPatients() {
    this.snack.open('Patients module not created yet', 'OK', { duration: 3000 });
  }

  goToProfile() {
    this.snack.open('Profile page coming soon!', 'OK', { duration: 3000 });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

