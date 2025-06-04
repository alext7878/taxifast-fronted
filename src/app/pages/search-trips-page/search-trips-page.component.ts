import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-search-trips-page',
  imports: [],
  templateUrl: './search-trips-page.component.html',
  styleUrl: './search-trips-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTripsPageComponent {

  tripService = inject(TripService);

  trips = signal<any[]>([]);

  ngOnInit() {
    this.tripService.getTrips()
      .subscribe({
        next: trips => this.trips.set(trips),
        error: (error => console.log(error))
      })
  }
}
