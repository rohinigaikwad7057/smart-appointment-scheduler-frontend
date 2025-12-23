import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminService } from '../../../services/admin.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-doctors',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './manage-doctors.component.html',
  styleUrl: './manage-doctors.component.scss'
})
export class ManageDoctorsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'specialization', 'experience', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  pageSize = 5;
  showAddForm = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form: FormGroup;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      specialization: ['', Validators.required],
      experience: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.adminService.getDoctors().subscribe((res: any[]) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    });
  }


  addDoctor() {
    if (this.form.invalid) return;

    this.adminService.addDoctor(this.form.value).subscribe({
      next: () => {
        this.form.reset();
        this.showAddForm = false; // 👈 close form
        this.loadDoctors();       // refresh table
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  removeDoctor(id: string) {
    if (!confirm('Remove this doctor?')) return;

    this.adminService.deleteDoctor(id).subscribe({
      next: () => {
        this.snackBar.open('Doctor removed', 'Close', { duration: 3000 });
        this.loadDoctors();
      },
      error: () => {
        this.snackBar.open('Delete failed', 'Close', { duration: 3000 });
      }
    });
  }
}