import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

// ✅ FIX Leaflet icon path for Angular
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/marker-icon.png',
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png'
});

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {

    this.map = L.map('map').setView([25.2048, 55.2708], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([25.2048, 55.2708])
      .addTo(this.map)
      .bindPopup('<b>Our Clinic</b><br>Dubai')
      .openPopup();

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      L.marker(e.latlng)
        .addTo(this.map)
        .bindPopup(`Lat: ${e.latlng.lat}<br>Lng: ${e.latlng.lng}`)
        .openPopup();
    });
  }
}
