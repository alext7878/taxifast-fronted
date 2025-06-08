import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MapService } from '../../services/map.service';
import { PlacesService } from '../../services/places.service';
import { Map, Marker, Popup } from 'mapbox-gl';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements AfterViewInit {

  @ViewChild('map') mapDiv!: ElementRef;
  placesService = inject(PlacesService);
  mapService = inject(MapService);
  tripService = inject(TripService);

  ngAfterViewInit() {
    if(!this.placesService.userLocation()) throw Error('No existe ubicación');
    
    const map = new Map({
      container: this.mapDiv.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.placesService.userLocation() as [number, number],
      zoom: 17
    });

    map.on('dblclick',() => this.addMarker());

    const popup = new Popup()
      .setHTML(`
        <br>
        <h6>Esta es tu ubicación actual</h6>`);

    const currentUserMarker = new Marker({ color: 'green' })
        .setLngLat(this.placesService.userLocation() as [number, number])
        .setPopup(popup)
        .addTo(map);

    this.mapService.setMap(map);
    this.mapService.currentUserMarker = currentUserMarker;
  }

  addMarker() {
    if(this.tripService.destination()) {
      return
    }

    const popup = new Popup()
      .setHTML(`
        <br>
        <h6>Este es tu destino</h6>`);

    const marker = new Marker({ color: 'blue', draggable: true })
      .setLngLat(this.mapService.map()?.getCenter()!)
      .setPopup(popup)
      .addTo(this.mapService.map()!);

    this.tripService.destination.set(marker);

    marker.on('dragend', () => this.dragEndMarker());
  }

  dragEndMarker() {
    this.mapService.getRouteBetweenPoints(
      this.placesService.userLocation() as [number, number],
      // [-72.89361508068856, 4.884192056215401],
      this.tripService.destination()?.getLngLat().toArray() as [number, number])
  }
}
