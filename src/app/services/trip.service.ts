import { inject, Injectable, signal } from '@angular/core';
import { Marker } from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { PlacesService } from './places.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  http = inject(HttpClient);
  authService = inject(AuthService);
  placesService = inject(PlacesService);
  destination = signal<Marker|null>(null);

  createTrip(data: any): Observable<any>  {
    const url = `${environment.baseUrl}/trip`;
    
    data.user_id = this.authService.user().id;
    data.driver_id = null;
    const [ start_lng, start_location ] = this.placesService.userLocation()!;
    data.start_location = String(`${start_lng}, ${start_location}`);

    const { lng, lat } = this.destination()?.getLngLat()!;
    data.destination = String(`${lng}, ${lat}`);
    return this.http.post(url, data);
  }
  
  getTrips(): Observable<any[]> {
    const url = `${environment.baseUrl}/trip?status=En curso`;
    return this.http.get<any[]>(url);
  }
}
