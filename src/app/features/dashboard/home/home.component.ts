import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AboutComponent } from '../about/about.component';
import { ServicesComponent } from '../services/services.component';
import { BlogsComponent } from '../blogs/blogs.component';
import { BookComponent } from '../../booking/book/book.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { PricingComponent } from '../pricing/pricing.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    AboutComponent,
    ServicesComponent,
    BlogsComponent,
    BookComponent,
    ContactsComponent,
    PricingComponent


  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  role: string | null = null;
  mobileNavOpen = false;

  constructor(private router: Router, public authService: AuthService, private route: ActivatedRoute) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.role = user.role || null;
  }
  activeSection = 'home';

  toggleMobileNav() { this.mobileNavOpen = !this.mobileNavOpen; }
  closeMobileNav() { this.mobileNavOpen = false; }

  @HostListener('window:scroll', [])

  onScroll(): void {
    const sections = ['home', 'about', 'services', 'pricing', 'blog'];

    for (let section of sections) {
      const el = document.getElementById(section);
      if (!el) continue;

      const top = el.offsetTop - 120;
      const bottom = top + el.offsetHeight;

      if (window.scrollY >= top && window.scrollY < bottom) {
        this.activeSection = section;
        break;
      }
    }
  }

  goToBook() {
    this.router.navigate(['/patient/book']);
  }

  goToHistory() {
    this.router.navigate(['/patient/history']);
  }

  goToAppointment() {
    this.router.navigate(['/doctor/appointments']);
  }

  goToManageTreatments() {
    this.router.navigate(['/admin/treatments']);
  }

  goToManageDoctors() {
    this.router.navigate(['/admin/doctors']);
  }
  goToPatients() {
    alert("Patients module not created yet");
  }

  goToProfile() {
    alert("Profile page coming soon!");
  }

}


