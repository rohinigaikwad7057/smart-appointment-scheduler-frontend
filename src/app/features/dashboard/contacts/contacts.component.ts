import { Component } from '@angular/core';
import { MapComponent } from '../../map/map.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
 currentYear = new Date().getFullYear();
}
