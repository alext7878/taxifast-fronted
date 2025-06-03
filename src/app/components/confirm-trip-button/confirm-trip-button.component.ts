import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-trip-button',
  imports: [],
  templateUrl: './confirm-trip-button.component.html',
  styleUrl: './confirm-trip-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmTripButtonComponent {

    tripService = inject(TripService);
    router = inject(Router);

    confirmTrip() {
      this.router.navigate(['app', 'order-service']);
    }
}
