import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../../services/auth.service';
import { AppointmentDetailsDialogComponent } from '../../appoinment-details/appointment-details-dialog/appointment-details-dialog.component';

@Component({
  selector: 'app-doctor-appointments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTabsModule
  ],
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.scss']
})
export class DoctorAppointmentsComponent
  implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'index',
    'patient',
    'date',
    'slot',
    'status',
    'action'
  ];

  dataSource = new MatTableDataSource<any>([]);
  originalData: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Custom filter (search patient name, date, slot, status)
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const text = (
        data.patientId?.name +
        data.date +
        data.slot +
        data.status
      ).toLowerCase();
      return text.includes(filter);
    };

    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData(): void {
    this.auth.getDoctorAppointments().subscribe({
      next: (res: any[]) => {
        this.originalData = res;
        this.dataSource.data = res;
      },
      error: err => {
        console.error('Failed to load appointments', err);
      }
    });
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = value;
  }

  // Tabs: All | Today | Upcoming | Completed
  filterTab(event: any): void {
    const tabIndex = event.index;
    const today = new Date().toISOString().split('T')[0];

    switch (tabIndex) {
      case 1: // Today
        this.dataSource.data = this.originalData.filter(
          a => a.date === today
        );
        break;

      case 2: // Upcoming
        this.dataSource.data = this.originalData.filter(
          a => a.status === 'Accepted' && a.date > today
        );
        break;

      case 3: // Completed
        this.dataSource.data = this.originalData.filter(
          a => a.status === 'Completed'
        );
        break;

      default: // All
        this.dataSource.data = this.originalData;
    }
  }

  openDetails(row: any): void {
    const ref = this.dialog.open(AppointmentDetailsDialogComponent, {
      width: '640px',
      data: row
    });

    ref.afterClosed().subscribe(() => {
      this.loadData();
    });
  }

  accept(id: string): void {
    this.auth.acceptAppointment(id).subscribe(() => {
      this.snack.open('Appointment Accepted ✔', 'OK', { duration: 2000 });
      this.loadData();
    });
  }

  reject(id: string): void {
    this.auth.rejectAppointment(id).subscribe(() => {
      this.snack.open('Appointment Rejected ❌', 'OK', { duration: 2000 });
      this.loadData();
    });
  }

  markCompleted(id: string): void {
    this.auth.completeAppointment(id).subscribe(() => {
      this.snack.open('Appointment Completed ✔', 'OK', { duration: 2000 });
      this.loadData();
    });
  }
}
