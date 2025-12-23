import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AppointmentService } from '../../../services/appointment.service';
import { AuthService } from '../../../services/auth.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
    , MatSnackBarModule,
    MatPaginator,
    MatTableModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  allAppointments: any[] = [];
  appointments: any[] = [];
  pagedAppointments: any[] = [];

  filterType: 'upcoming' | 'past' = 'upcoming';

  totalAppointments = 0;
  pageSize = 6;
  pageIndex = 0;
  loading = true;

  constructor(
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.auth.getPatientAppointments().subscribe({
      next: (res: any[]) => {
        // remove cancelled
        this.allAppointments = res.filter(a => a.status !== 'Cancelled');
        this.applyFilter();
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  applyFilter() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.filterType === 'upcoming') {
      this.appointments = this.allAppointments.filter(
        a => new Date(a.date) >= today
      );
    } else {
      this.appointments = this.allAppointments.filter(
        a => new Date(a.date) < today
      );
    }

    // sort by date
    this.appointments.sort(
      (a, b) => +new Date(a.date) - +new Date(b.date)
    );

    this.pageIndex = 0;
    this.totalAppointments = this.appointments.length;
    this.updatePagedData();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedData();
  }

  updatePagedData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedAppointments = this.appointments.slice(start, end);
  }

  cancelAppointment(id: string) {
    if (!confirm('Cancel this appointment?')) return;

    this.auth.cancelAppointment(id).subscribe(res => {
      this.snack.open(res.message || 'Appointment cancelled', 'OK', {
        duration: 3000
      });
      this.loadAppointments();
    });
  }
}

