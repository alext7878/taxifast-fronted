import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { AuthService } from '../../services/auth.service';
import { TripStatus } from '../../interfaces/trip.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-trips-page',
  imports: [RouterLink],
  templateUrl: './search-trips-page.component.html',
  styleUrl: './search-trips-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTripsPageComponent {

  router = inject(Router);
  tripService = inject(TripService);
  authService = inject(AuthService);

  trip = signal<any>(null);
  trips = signal<any[]>([]);

  ngOnInit() {
    this.tripService.getTripByDriver(this.authService.user().id)
      .subscribe({
        next: (res => {
          if(res) {
            this.trip.set(res);
            return;
          }
          this.getTrips();
        }),
        error: (error => console.log(error))
      })
  }

  getTrips() {
    this.tripService.getTrips()
      .subscribe({
        next: trips => this.trips.set(trips),
        error: (error => console.log(error))
    })
  }

  acceptTrip(trip: any) {
    const data = {
      driver_id: this.authService.user().id,
      status: TripStatus.INPROGRESS,
      user_id: trip.user_id,
    }

    this.tripService.acceptTrip(trip.id, data)
      .subscribe({
        next: (() => {
          alert('Viaje aceptado');
          this.router.navigate(['app', 'trip', trip.id])
        }),
        error: (error => console.log(error))
      })

  }
}
