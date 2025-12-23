import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  apiUrl = `${environment.apiUrl}/appointments`; // Clinic backend

  constructor(private http: HttpClient) {}

  // Book appointment
  bookAppointment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/book`, data);
  }

  // Fetch patient appointments
  getAppointments(patientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/patient/${patientId}`);
  }

  // Get available slots (optional)
  getAvailableSlots(): Observable<any> {
    return this.http.get(`${this.apiUrl}/slots`);
  }
}
