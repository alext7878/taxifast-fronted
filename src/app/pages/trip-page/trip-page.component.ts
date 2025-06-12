import { AfterViewInit, ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { PlacesService } from '../../services/places.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { TripService } from '../../services/trip.service';
import { AuthService } from '../../services/auth.service';
import { MapService } from '../../services/map.service';
import { Marker, Popup } from 'mapbox-gl';
import { EndTripButtonComponent } from '../../components/end-trip-button/end-trip-button.component';

@Component({
  selector: 'app-trip-page',
  imports: [MapComponent, LoadingComponent, EndTripButtonComponent, RouterLink],
  templateUrl: './trip-page.component.html',
  styleUrl: './trip-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripPageComponent {

  router = inject(Router);
  mapService = inject(MapService);
  tripService = inject(TripService);
  authService = inject(AuthService);
  placesService = inject(PlacesService);
  autivatedRouter = inject(ActivatedRoute);

  public get isUserLocationReady(): boolean {
    return this.placesService.isUserLocationReady;
  }

  private intervalId: any;

  ngOnInit() {
    console.log('Start TripPageComponent ngOnInit');
    this.autivatedRouter.params
      .pipe(
        switchMap(({ trip_id }) => this.tripService.getTripByIdAndDriver(trip_id, this.authService.user().id))
      ).subscribe({
        next: (res => this.setTripData(res)),
        error: (error => console.log(error))
      })
    console.log('End TripPageComponent ngOnInit');
    // Ejecutar cada 30 segundos
    this.intervalId = setInterval(() => {
      this.updateDriverUbication();
    }, 30000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateDriverUbication() {
    console.log('Actualizando ubicación del conductor');
    this.placesService.getUserLocation();
    this.mapService.currentUserMarker?.setLngLat(this.placesService.userLocation() as [number, number]);
  }

  setTripData(trip: any) {
    if(!trip||!this.mapService.isMapReady) {
      this.router.navigate(['app', 'search-trips']);
      return;
    }

    const origin = this.splitCoordinates(trip.start_location);
    const destination = this.splitCoordinates(trip.destination);

    this.addMarker('Origen', 'blue', origin);
    this.addMarker('Destino', 'blue', destination);
    this.mapService.getRouteBetweenPoints(origin, destination);
  }

  splitCoordinates(coordinates: string): [number, number] {
    const splitedCoords = coordinates.split(',');
    return [
      Number(splitedCoords[0].trim()),
      Number(splitedCoords[1].trim()),
    ]
  }

  addMarker(text: string, color: string, coordinates: [number, number]) {
    if(this.tripService.destination()) {
      return
    }

    const popup = new Popup()
      .setHTML(`
        <br>
        <h6>${text}</h6>`);

    new Marker({ color: color, draggable: true })
      .setLngLat(coordinates)
      .setPopup(popup)
      .addTo(this.mapService.map()!);
  }
}
