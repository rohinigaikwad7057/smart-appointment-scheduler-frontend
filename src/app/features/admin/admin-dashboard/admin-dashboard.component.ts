import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule,BaseChartDirective],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  stats: any = { doctorsCount: 0, treatmentsCount: 0, appointmentsCount: 0, patientsCount: 0 };

  constructor(private adminService: AdminService) { }
barChartOptions = {
  responsive: true,
  maintainAspectRatio: false
};

barChartData = {
  labels: ['Doctors', 'Treatments', 'Appointments', 'Patients'],
  datasets: [
    {
      label: 'Clinic Statistics',
      data: []
    }
  ]
};
  ngOnInit(): void {
    this.adminService.getDashboard().subscribe((res: any) => this.stats = res);
    
  }
}
