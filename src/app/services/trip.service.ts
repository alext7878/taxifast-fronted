import { Injectable, signal } from '@angular/core';
import { Marker } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  destination = signal<Marker|null>(null);
}
