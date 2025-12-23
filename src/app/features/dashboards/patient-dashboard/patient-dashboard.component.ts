import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule,
      MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})
export class PatientDashboardComponent {

  upcomingCount = 0;
  completedCount = 0;
  cancelledCount = 0;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadPatientStats();
  }

  loadPatientStats() {
    this.authService.getPatientAppointments().subscribe(appts => {
      this.upcomingCount = appts.filter((a: any) =>
        a.status === 'Booked' || a.status === 'Accepted').length;

      this.completedCount = appts.filter((a: any) =>
        a.status === 'Completed').length;

      this.cancelledCount = appts.filter((a: any) =>
        a.status === 'Cancelled').length;
    });
  }

  goToBook() {
    this.router.navigate(['/patient/book']);
  }

  goToHistory() {
    this.router.navigate(['/patient/history']);
  }

  goToProfile() {
    this.router.navigate(['/patient/profile']);
  }
}

