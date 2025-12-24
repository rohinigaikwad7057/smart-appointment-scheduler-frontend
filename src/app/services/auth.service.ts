import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // 🔐 ADMIN AUTH
  adminLogin(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/admin/login`, payload);
  }

  createAdmin(payload: any): Observable<any> {
    const token = this.getToken();
    return this.http.post(`${this.baseUrl}/api/admin/create`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  // 👤 PATIENT LOGIN
  loginPatient(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/patients/login`, payload);
  }

  // 👨‍⚕️ DOCTOR LOGIN
  loginDoctor(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/doctors/login`, payload);
  }

  // 📝 PATIENT REGISTER
  registerPatient(payload: any) {
    return this.http.post(`${this.baseUrl}/api/patients/register`, payload);
  }

  // 🧑‍⚕️ ADD DOCTOR (Admin)
  addDoctor(payload: any) {
    const token = this.getToken();
    return this.http.post(`${this.baseUrl}/api/doctors/add`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/doctors`);
  }

  // 🦷 Treatments
  getTreatments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/treatments`);
  }

  // 📅 Appointment Slots
  getSlots(doctorId: string, date: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/api/appointments/slots?doctorId=${doctorId}&date=${date}`
    );
  }

  // 🩺 Book Appointment
  bookAppointment(payload: any): Observable<any> {
    const token = this.getToken();
    return this.http.post(`${this.baseUrl}/api/appointments/book`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ❌ Cancel Appointment
  cancelAppointment(id: string): Observable<any> {
    const token = this.getToken();
    return this.http.patch(`${this.baseUrl}/api/appointments/cancel/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // 📋 Doctor Appointments
  getDoctorAppointments(): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.baseUrl}/api/appointments/doctor`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getPatientAppointments(): Observable<any> {
    const token = this.getToken();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.get(`${this.baseUrl}/api/appointments/patient/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ✔ Accept / Reject / Complete
  updateAppointmentStatus(id: string, status: string) {
    return this.http.patch(`${this.baseUrl}/api/appointments/doctor/status/${id}`, { status });
  }

  saveAppointmentNotes(id: string, notes: string) {
    const token = this.getToken();
    return this.http.patch(
      `${this.baseUrl}/api/appointments/doctor/notes/${id}`,
      { notes },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  acceptAppointment(id: string) {
    return this.updateAppointmentStatus(id, "Accepted");
  }

  rejectAppointment(id: string) {
    return this.updateAppointmentStatus(id, "Rejected");
  }

  completeAppointment(id: string): Observable<any> {
    const token = this.getToken();
    return this.http.patch(
      `${this.baseUrl}/api/appointments/doctor/complete/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  logout() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
