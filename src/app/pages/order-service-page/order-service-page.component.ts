import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-order-service-page',
  imports: [],
  templateUrl: './order-service-page.component.html',
  styleUrl: './order-service-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderServicePageComponent {

  tripService = inject(TripService);
  router = inject(Router);

  setDestination() {
    this.router.navigate(['app', 'map']);
  }
}
