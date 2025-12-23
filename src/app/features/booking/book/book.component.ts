import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatCardModule
  ],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  user: any;
  treatments: any[] = [];
  doctors: any[] = [];
  slots: string[] = [];

  selectedTreatment: string = '';
  selectedDoctor: string = '';
  selectedSlot: string = '';
  symptoms: string = '';
  selectedDate!: Date;
  minDate: Date = new Date();
  slotsFetched: boolean = false;


  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  formatDateLocal(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

   
  // Load doctors
  this.auth.getDoctors().subscribe(d => this.doctors = d);

  // Load treatments from backend
  this.auth.getTreatments().subscribe(t => this.treatments = t);
  }

fetchSlots() {
  if (!this.selectedDoctor || !this.selectedDate) return;

  const today = new Date();
  const selected = new Date(this.selectedDate);
  const formattedDate = this.formatDateLocal(selected);

  this.auth.getSlots(this.selectedDoctor, formattedDate).subscribe(
    (res: any) => {
      let availableSlots = res.slots;
      this.slotsFetched = true;

   if (selected.toDateString() === today.toDateString()) {
  const currentTime = today.getHours() * 60 + today.getMinutes();

  availableSlots = availableSlots.filter((slot: string) => {
    const [hour, minute] = slot.split('-')[0].split(':').map(Number);
    const slotTime = hour * 60 + minute;
    return slotTime >= currentTime;
  });
}


      this.slots = availableSlots;

      if (!this.slots.length) {
        this.snack.open('No slots available for this date', 'OK', { duration: 3000 });
      }
    },
    err => console.error("Slot fetch error:", err)
  );
}

goToAppointment() {
  if (!this.user) {
    this.router.navigate(['/login/patient'], {
      queryParams: { returnUrl: '/#contact' }
    });
    return;
  }

  // If logged in → scroll to section
this.router.navigateByUrl('/#book');
}


bookAppointment() {
  if (!this.selectedTreatment || !this.selectedDoctor || !this.selectedDate || !this.selectedSlot) {
    this.snack.open('Please fill all required fields', 'OK', { duration: 3000 });
    return;
  }

  const bookingDate = this.formatDateLocal(this.selectedDate);

  const payload = {
    treatmentId: this.selectedTreatment,
    doctorId: this.selectedDoctor,
    date: bookingDate,
    slot: this.selectedSlot,
    symptoms: this.symptoms
  };

  this.auth.bookAppointment(payload).subscribe({
    next: res => {
      this.snack.open('Appointment booked successfully!', 'OK', { duration: 3000 });
      this.fetchSlots();
      this.router.navigate(['patient/dashboard']);
    },
    error: err => {
      console.error(err);
      this.snack.open(err.error?.message || 'Failed to book appointment', 'OK', { duration: 4000 });
    }
  });
}

}
