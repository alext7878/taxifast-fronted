import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { MapComponent } from '../../components/map/map.component';
import { ConfirmTripButtonComponent } from '../../components/confirm-trip-button/confirm-trip-button.component';

@Component({
  selector: 'app-map-page',
  imports: [MapComponent, LoadingComponent, ConfirmTripButtonComponent],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPageComponent {

  placesService = inject(PlacesService);

  public get isUserLocationReady(): boolean {
    return this.placesService.isUserLocationReady;
  }
  
}
