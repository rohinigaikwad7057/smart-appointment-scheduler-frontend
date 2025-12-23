import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './features/layouts/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  role: string | null = null;
  userName: string | null = null;

  mobileMenuOpen = false;
  showHeader = false;
  showSidebar = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        const url = event.urlAfterRedirects;

        // Public pages (before login)
        const publicPages = ['/', '/about', '/services', '/team', '/blogs', '/appointment-details'];

        // Auth pages
        const authPages = ['/login', '/register'];

        const isPublicPage = publicPages.some(p =>
          p === '/' ? url === '/' : url.startsWith(p)
        );

        const isAuthPage = authPages.some(p => url.startsWith(p));

        const isLoggedIn = this.authService.isLoggedIn();

        /* ================= FINAL VISIBILITY LOGIC ================= */

        // ✅ Header ONLY before login (public pages)
        this.showHeader = isPublicPage && !isLoggedIn;

        // ✅ Sidebar ONLY after login (protected pages)
        this.showSidebar = isLoggedIn && !isPublicPage && !isAuthPage;

        // Load user data
        this.role = localStorage.getItem('role');
        this.userName = localStorage.getItem('userName');
      }
    });
  }

  ngOnInit(): void {
    // Load user name safely
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        this.userName = parsed.name || parsed.fullName || null;
      } catch {
        this.userName = null;
      }
    }

    // AOS animation
    AOS.init({
      duration: 900,
      offset: 120,
      easing: 'ease-in-out',
      once: true
    });
  }

  /* ================= MOBILE MENU ================= */

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobile() {
    if (window.innerWidth <= 768) {
      this.mobileMenuOpen = false;
    }
  }

  logout() {
    this.authService.logout();
    this.mobileMenuOpen = false;
    this.router.navigate(['/']);
  }
}
