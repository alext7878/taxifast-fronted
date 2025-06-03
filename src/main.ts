import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import mapboxgl from 'mapbox-gl';
import { environment } from './environments/environment';
mapboxgl.accessToken = environment.MAPBOX_KEY;

if(!navigator.geolocation) {
  alert('El navegador no soporta Geolocalización');
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
