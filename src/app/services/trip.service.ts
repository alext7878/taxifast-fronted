import { inject, Injectable, signal } from '@angular/core';
import { Marker } from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map, Observable, of } from 'rxjs';
import { Places } from '../interfaces/places.interface';
import { TripStatus } from '../interfaces/trip.interface';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  http = inject(HttpClient);
  authService = inject(AuthService);
  destination = signal<Marker|null>(null);

  createTrip(data: any): Observable<any>  {
    const url = `${environment.baseUrl}/trip`;
    return this.http.post(url, data);
  }

  acceptTrip(trip_id: number, data: any) {
    const url = `${environment.baseUrl}/trip/accept/${trip_id}`;
    return this.http.put(url, data);
  }

  cancelTrip(user_id: number, trip_id: number) {
    const url = `${environment.baseUrl}/trip/${trip_id}/user/${user_id}`;
    return this.http.put(url, {});
  }

  endTrip(trip_id: number, driver_id: number,) {
    const url = `${environment.baseUrl}/trip/${trip_id}/driver/${driver_id}`;
    return this.http.put(url, {});
  }
  
  getTripByIdAndDriver(id: number, driver_id: number): Observable<any> {
    const url = `${environment.baseUrl}/trip/${id}/driver/${driver_id}`;
    return this.http.get<any>(url);
  }

  getTrips(): Observable<any[]> {
    const url = `${environment.baseUrl}/trip?status=${TripStatus.PENDING}`;
    return this.http.get<any[]>(url);
  }

  getTripByUser(user_id: number) {
    const url = `${environment.baseUrl}/trip/user/${user_id}`;
    return this.http.get(url);
  }

  reverseGeocoding(coords: { lng: number, lat: number }): Observable<any> {
    const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${coords.lng}&latitude=${coords.lat}&access_token=${environment.MAPBOX_KEY}`;
    return this.http.get<Places>(url)
      .pipe(
        map(d => d.features[0] ? d.features[0].properties.name_preferred : 'Sin dirección')
      );
  }

  getTripByDriver(driver_id: number) {
    const url = `${environment.baseUrl}/trip/driver/${driver_id}`;
    return this.http.get(url);
  }
}
