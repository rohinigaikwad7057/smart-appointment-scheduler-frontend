import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ---------------------------
  // 🔐 ADMIN AUTH
  // ---------------------------
  adminLogin(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/login`, payload);
  }

  createAdmin(payload: any): Observable<any> {
    const token = this.getToken();
    return this.http.post(`${this.baseUrl}/admin/create`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  // ---------------------------
  // 👤 PATIENT LOGIN
  // ---------------------------
  loginPatient(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/patients/login`, payload);
  }

  // ---------------------------
  // 👨‍⚕️ DOCTOR LOGIN
  // ---------------------------
  loginDoctor(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/doctors/login`, payload);
  }

  // ---------------------------
  // 📝 PATIENT REGISTER
  // ---------------------------
  registerPatient(payload: any) {
    return this.http.post(`${this.baseUrl}/patients/register`, payload);
  }

  // ---------------------------
  // 🧑‍⚕️ ADD DOCTOR (Admin)
  // ---------------------------
  addDoctor(payload: any) {
    const token = this.getToken();
    return this.http.post(`${this.baseUrl}/doctors/add`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/doctors`);
  }

  // ---------------------------
  // 🦷 Treatments
  // ---------------------------
  getTreatments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/treatments`);
  }

  // ---------------------------
  // 📅 Appointment Slots
  // ---------------------------
  getSlots(doctorId: string, date: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/appointments/slots?doctorId=${doctorId}&date=${date}`
    );
  }

  // ---------------------------
  // 🩺 Book Appointment
  // ---------------------------
  bookAppointment(payload: any): Observable<any> {
    const token = this.getToken();
    return this.http.post(`${this.baseUrl}/appointments/book`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ---------------------------
  // ❌ Cancel Appointment
  // ---------------------------
  cancelAppointment(id: string): Observable<any> {
    const token = this.getToken();
    return this.http.patch(`${this.baseUrl}/appointments/cancel/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ---------------------------
  // 📋 Doctor Appointments
  // ---------------------------
  getDoctorAppointments(): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.baseUrl}/appointments/doctor`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getPatientAppointments(): Observable<any> {
    const token = this.getToken();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.get(`${this.baseUrl}/appointments/patient/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ---------------------------
  // ✔ Accept / Reject / Complete
  // ---------------------------
  updateAppointmentStatus(id: string, status: string) {
    return this.http.patch(`${this.baseUrl}/appointments/doctor/status/${id}`, { status });
  }

  saveAppointmentNotes(id: string, notes: string) {
    const token = this.getToken();
    return this.http.patch(
      `${this.baseUrl}/appointments/doctor/notes/${id}`,
      { notes },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  acceptAppointment(id: string) {
    const token = this.getToken();
    return this.http.patch(
      `${this.baseUrl}/appointments/doctor/status/${id}`,
      { status: "Accepted" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  rejectAppointment(id: string) {
    const token = this.getToken();
    return this.http.patch(
      `${this.baseUrl}/appointments/doctor/status/${id}`,
      { status: "Rejected" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  completeAppointment(id: string): Observable<any> {
    const token = this.getToken();
    return this.http.patch(
      `${this.baseUrl}/appointments/doctor/complete/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  // ---------------------------
  // 🔑 Common helpers
  // ---------------------------
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
