import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-appointment-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
    , MatSnackBarModule
  ],
  templateUrl: './appointment-details-dialog.component.html',
})
export class AppointmentDetailsDialogComponent {
  savingNotes = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AppointmentDetailsDialogComponent>,
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  close() {
    this.dialogRef.close();
  }

  saveNotes() {
    if (!this.data || !this.data._id) return;

    this.savingNotes = true;

    this.auth.saveAppointmentNotes(this.data._id, this.data.notes)
      .subscribe({
        next: () => {
          this.savingNotes = false;
          this.snack.open('Notes saved successfully', 'OK', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: () => {
          this.savingNotes = false;
          this.snack.open('Failed to save notes', 'OK', { duration: 3000 });
        }
      });
  }


}
