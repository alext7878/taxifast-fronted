import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-service-page',
  imports: [ReactiveFormsModule],
  templateUrl: './order-service-page.component.html',
  styleUrl: './order-service-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderServicePageComponent {

  router = inject(Router);
  tripService = inject(TripService);

  private formBuilder = inject(FormBuilder);

  tripForm = this.formBuilder.group({
    payment_method: ['', Validators.required], 
  })

  ngOnInit() {
    //obtener viajes del usuario para validar que mostrar
  }

  setDestination() {
    this.router.navigate(['app', 'map']);
  }
  
  createTrip() {
    const trip = this.tripForm.value as any;
    trip.status = 'En Curso';
    this.tripService.createTrip(trip)
      .subscribe({
        next: (() => alert('Viaje creado correctamente, espera que un conductor acepte tu viaje')),
        error: (error => console.log(error))
      })
  }
}
