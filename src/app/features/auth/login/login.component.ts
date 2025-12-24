import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = '';
  password = '';

  loginType: 'patient' | 'doctor' | 'admin' = 'patient';
  returnUrl: string = '/';
  userType: string = 'patient';

  setUserType(type: 'patient' | 'doctor' | 'admin') {
    this.userType = type;
    this.email = '';
    this.password = '';
  }


  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  }


  login() {
    if (!this.email || !this.password) {
      this.snack.open('Enter credentials', 'OK', { duration: 3000 });
      return;
    }

    const payload = { email: this.email, password: this.password };

    // DOCTOR LOGIN
    if (this.userType === 'doctor') {
      this.auth.loginDoctor(payload).subscribe({
        next: (res: any) => {
           this.snack.open('Registration successful! Please login.', 'OK', { duration: 3000 });
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', 'doctor');
          this.snack.open('Doctor login successful!', 'OK', { duration: 2000 });
          setTimeout(() => this.router.navigate(['doctor/dashboard']), 2000);
        },
        error: () => this.snack.open('Invalid doctor credentials', 'OK', { duration: 3000 })
      });
      return;
    }

    // ADMIN LOGIN
    if (this.userType === 'admin') {
      this.auth.adminLogin(payload).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', 'admin');
          this.snack.open('Admin login successful!', 'OK', { duration: 2000 });
          setTimeout(() => this.router.navigate(['/admin/dashboard']), 2000);
        },
        error: () => this.snack.open('Invalid admin credentials', 'OK', { duration: 3000 })
      });
      return;
    }

    // PATIENT LOGIN
    this.auth.loginPatient(payload).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', 'patient');
        localStorage.setItem('user', JSON.stringify(res.user));
        this.snack.open('Patient login successful!', 'OK', { duration: 2000 });

  setTimeout(() => this.router.navigate(['/patient/dashboard']), 2000)
      },
      error: () => this.snack.open('Invalid patient credentials', 'OK', { duration: 3000 })
    });
  }
}
