import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() collapsed = false;
 @Input() open = false;   // 👈 receives state from AppComponent
  @Input() role: string | null = null;


  closeSidebar() {
    this.open = false;
  }
  constructor(public authService: AuthService, public router :Router) {}

  toggle() {
    this.collapsed = !this.collapsed;
  }

  // get  role() {
  //   return this.authService.getRole();
  // }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
