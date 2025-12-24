import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Treatments
  addTreatment(payload: any) {
    return this.http.post(`${this.url}/api/treatments/add`, payload);
  }

  deleteTreatment(id: string) {
    return this.http.delete(`${this.url}/api/treatments/${id}`);
  }

  getTreatments() {
    return this.http.get<any[]>(`${this.url}/api/treatments`);
  }

  // Doctors
  addDoctor(payload: any) {
    return this.http.post(`${this.url}/api/doctors/add`, payload);
  }

  getDoctors() {
    return this.http.get<any[]>(`${this.url}/api/doctors`);
  }

  deleteDoctor(id: string) {
    return this.http.delete<{ message: string }>(
      `${this.url}/api/doctors/${id}`
    );
  }

  // Appointments
  getAppointments() {
    return this.http.get<any[]>(`${this.url}/api/appointments/all`);
  }

  deleteAppointment(id: string) {
    return this.http.delete(`${this.url}/api/appointments/${id}`);
  }

  // Dashboard
  getDashboard() {
    return this.http.get(`${this.url}/api/admin/dashboard`);
  }
}
