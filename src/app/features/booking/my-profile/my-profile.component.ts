import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '../../../services/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule
    , MatSnackBarModule
  ],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  profileForm!: FormGroup;
  medicalForm!: FormGroup;
  emergencyForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // 🔹 Personal Info
    this.profileForm = this.fb.group({
      name: [user.name || '', Validators.required],
      email: [{ value: user.email || '', disabled: true }],
      phone: [user.phone || '', Validators.required],
      gender: [user.gender || ''],
      dob: [user.dob || '']
    });

    // 🔹 Medical Info
    this.medicalForm = this.fb.group({
      bloodGroup: [user.bloodGroup || ''],
      allergies: [user.allergies || ''],
      conditions: [user.conditions || ''],
      medications: [user.medications || '']
    });

    // 🔹 Emergency Contact
    this.emergencyForm = this.fb.group({
      contactName: [user.emergencyContact?.name || ''],
      contactPhone: [user.emergencyContact?.phone || ''],
      relation: [user.emergencyContact?.relation || '']
    });
  }

  saveProfile() {
    const updatedUser = {
      ...this.profileForm.getRawValue(),
      ...this.medicalForm.value,
      emergencyContact: this.emergencyForm.value
    };

    // 🔹 Save locally (later connect API)
    localStorage.setItem('user', JSON.stringify(updatedUser));
    this.snack.open('Profile updated successfully', 'OK', { duration: 3000 });
  }
}
