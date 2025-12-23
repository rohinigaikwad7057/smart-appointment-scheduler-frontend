import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../../services/admin.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-treatments',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    ReactiveFormsModule, CommonModule,
    MatTableModule, MatPaginatorModule
  ],
  templateUrl: './manage-treatments.component.html',
  styleUrl: './manage-treatments.component.scss'
})
export class ManageTreatmentsComponent implements OnInit {

  treatments: any[] = [];
  pageSize = 5;
  displayedColumns = ['name', 'duration', 'price', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  form: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  showAddForm = false;
  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
      price: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadTreatments();
  }

  loadTreatments() {
    this.adminService.getTreatments().subscribe((res: any[]) => {
      this.dataSource.data = res || [];
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  addTreatment() {
    if (this.form.invalid) return;

    this.adminService.addTreatment(this.form.value).subscribe(() => {
      this.form.reset();
      this.showAddForm = false;
      this.loadTreatments();
    });
  }

  deleteTreatment(id: string) {
    if (!confirm('Delete this treatment?')) return;
    this.adminService.deleteTreatment(id).subscribe(() => this.loadTreatments());
  }
}

