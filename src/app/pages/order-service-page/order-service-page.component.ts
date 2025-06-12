import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth.service';
import { PlacesService } from '../../services/places.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-order-service-page',
  imports: [ReactiveFormsModule],
  templateUrl: './order-service-page.component.html',
  styleUrl: './order-service-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderServicePageComponent {

  router = inject(Router);
  authService = inject(AuthService);
  tripService = inject(TripService);
  placesService = inject(PlacesService);

  private formBuilder = inject(FormBuilder);

  tripForm = this.formBuilder.group({
    payment_method: ['', Validators.required], 
  })

  ngOnInit() { }

  rxTrip = rxResource<any, any>({
  loader: () => this.tripService.getTripByUser(this.authService.user().id)});

  setDestination() {
    this.router.navigate(['app', 'map']);
  }
  createTrip() {
    const trip = this.tripForm.value as any;
    trip.status = 'Pendiente';
    trip.user_id = this.authService.user().id;
    trip.driver_id = null;

    const [ start_lng, start_location ] = this.placesService.userLocation()!;
    trip.start_location = String(`${start_lng}, ${start_location}`);
    
    const { lng, lat } = this.tripService.destination()?.getLngLat()!;
    trip.destination = String(`${lng}, ${lat}`);

    this.tripService.reverseGeocoding({ lng, lat })
      .pipe(
        switchMap((direction) => this.tripService.createTrip({...trip, direction}))
      )
      .subscribe({
        next: (() => {
          alert('Viaje creado correctamente, espera que un conductor acepte tu viaje');
          this.rxTrip.reload();
        }),
        error: (error => console.log(error))
      })
  }

  cancelTrip() {
    this.tripService.cancelTrip(this.rxTrip.value().user_id, this.rxTrip.value().id)
      .subscribe({
        next: (() => {
          alert('Su viaje ha sido cancelado');
          this.rxTrip.reload()
        }),
        error: (error => console.log(error))
      })
  }
}
