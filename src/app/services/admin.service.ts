import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  url = `${environment.apiUrl}`; // Base URL
  constructor(private http: HttpClient) {}

  // Treatments
  addTreatment(payload: any) {
    return this.http.post(`${this.url}/treatments/add`, payload);
  }
  deleteTreatment(id: string) {
    return this.http.delete(`${this.url}/treatments/${id}`);
  }
  getTreatments() {
    return this.http.get<any[]>(`${this.url}/treatments`);
  }

  // Doctors
  addDoctor(payload: any) {
    return this.http.post(`${this.url}/doctors/add`, payload);
  }
  
getDoctors() {
  return this.http.get<any[]>(`${this.url}/doctors`);
}

deleteDoctor(id: string) {
  return this.http.delete<{ message: string }>(
    `${this.url}/doctors/${id}`
  );
}

  // Appointments
  getAppointments() {
    return this.http.get<any[]>(`${this.url}/appointments/all`);
  }

  deleteAppointment(id: string) {
    return this.http.delete(`${this.url}/appointments/${id}`);
  }

  // Dashboard
  getDashboard() {
    return this.http.get(`${this.url}/admin/dashboard`);
  }
}
