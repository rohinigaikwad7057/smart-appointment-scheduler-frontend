import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'
import { Route, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
    RouterModule

  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  userType = ''; // patient or doctor

  constructor(private auth: AuthService, private router: Router, private snack: MatSnackBar) { }

  register() {
    if (!this.name || !this.email || !this.password) { this.snack.open('All fields required', 'OK', { duration: 3000 }); return; }

    this.auth.registerPatient({ name: this.name, email: this.email, password: this.password })
      .subscribe(() => this.router.navigate(['/login']),
        () => this.snack.open('Registration failed', 'OK', { duration: 3000 }));
  }
}
