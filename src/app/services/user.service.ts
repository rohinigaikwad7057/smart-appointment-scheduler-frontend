import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  url = `${environment.apiUrl}/patients`;
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${this.url}/me`);
  }

  updateProfile(data: any) {
    return this.http.put(`${this.url}/me`, data);
  }
}
