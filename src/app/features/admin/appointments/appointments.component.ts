import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatPaginatorModule, FormsModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit {

  rows: any[] = [];
  appointments: any[] = [];
  pagedAppointments: any[] = [];

  totalAppointments = 0;
  pageSize = 6;
  pageIndex = 0;

  filter: 'all' | 'upcoming' | 'past' = 'all';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.adminService.getAppointments().subscribe((res: any[]) => {
      this.rows = res || [];
      this.applyFilter(this.filter);
    });
  }

  deleteAppointment(id: string) {
    if (!confirm('Delete appointment?')) return;
    this.adminService.deleteAppointment(id).subscribe(() => this.load());
  }

  private todayIso(): string {
    return new Date().toISOString().split('T')[0];
  }

  applyFilter(view: 'all' | 'upcoming' | 'past') {
    this.filter = view;
    const today = this.todayIso();

    if (view === 'upcoming') {
      this.appointments = this.rows.filter(a => a.date >= today);
    }
    else if (view === 'past') {
      this.appointments = this.rows.filter(a => a.date < today);
    }
    else {
      this.appointments = [...this.rows];
    }

    this.totalAppointments = this.appointments.length;
    this.pageIndex = 0;
    this.updatePagedData();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedData();
  }

  private updatePagedData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedAppointments = this.appointments.slice(start, end);
  }
}

