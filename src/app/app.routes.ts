import { Routes } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withEnabledBlockingInitialNavigation
} from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { BookComponent } from './features/booking/book/book.component';
import { HistoryComponent } from './features/booking/history/history.component';
import { ManageTreatmentsComponent } from './features/admin/manage-treatments/manage-treatments.component';
import { AppointmentsComponent } from './features/admin/appointments/appointments.component';
import { HomeComponent } from './features/dashboard/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ManageDoctorsComponent } from './features/admin/manage-doctors/manage-doctors.component';
import { DoctorAppointmentsComponent } from './features/doctors/doctor-appointments/doctor-appointments.component';
import { AppointmentDetailsDialogComponent } from './features/appoinment-details/appointment-details-dialog/appointment-details-dialog.component';
import { PatientDashboardComponent } from './features/dashboards/patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './features/dashboards/doctor-dashboard/doctor-dashboard.component';
import { AboutComponent } from './features/dashboard/about/about.component';
import { ServicesComponent } from './features/dashboard/services/services.component';
import { BlogsComponent } from './features/dashboard/blogs/blogs.component';
import { PricingComponent } from './features/dashboard/pricing/pricing.component';
import { MyProfileComponent } from './features/booking/my-profile/my-profile.component';


// ===========================================
// 🚀 FINAL ROUTING CONFIG
// ===========================================
export const routes: Routes = [

  // -------------------------------
  // PUBLIC ROUTES
  // -------------------------------
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'team', component: PricingComponent },
  { path: 'blogs', component: BlogsComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'appointment-details', component: AppointmentDetailsDialogComponent },


  // -------------------------------
  // PATIENT ROUTES (Protected)
  // -------------------------------
  {
    path: 'patient',
    canActivateChild: [AuthGuard],
    data: { role: 'patient' },
    children: [
      { path: 'dashboard', component: PatientDashboardComponent },
      { path: 'book', component: BookComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'profile', component: MyProfileComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },



  // -------------------------------
  // DOCTOR ROUTES (Protected)
  // -------------------------------
  {
    path: 'doctor',
    canActivateChild: [AuthGuard],
    data: { role: 'doctor' },
    children: [
      { path: 'dashboard', component: DoctorDashboardComponent },
      { path: 'appointments', component: DoctorAppointmentsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },


  // -------------------------------
  // ADMIN ROUTES (Protected)
  // -------------------------------
  {
    path: 'admin',
    canActivateChild: [AuthGuard],
    data: { role: 'admin' },
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'treatments', component: ManageTreatmentsComponent },
      { path: 'doctors', component: ManageDoctorsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },


  // -------------------------------
  // FALLBACK ROUTE
  // -------------------------------
  { path: '**', redirectTo: '' }
];


// ===========================================
// ANGULAR APPLICATION CONFIG
// ===========================================
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withEnabledBlockingInitialNavigation()
    ),
  ],
};
