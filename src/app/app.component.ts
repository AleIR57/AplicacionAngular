import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Página de subastas con angular';
  center = {lat: 4.570868, lng: -74.297333};
  zoom = 15;
  display?: google.maps.LatLngLiteral;
}
