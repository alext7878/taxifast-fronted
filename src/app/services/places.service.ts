import { Injectable, signal } from '@angular/core';
import { Feature, Places } from '../interfaces/places.interface';
import { MapService } from './map.service';
import { PlacesApiClient } from '../api/placesApiClient';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  userLocation = signal<[ number, number ] | null>(null);
  isLoadingPlaces = signal<boolean>(false);
  places: Feature[] = [];

  public get isUserLocationReady(): boolean {
    return !!this.userLocation();
  }

  constructor(private placesApi: PlacesApiClient, private mapService: MapService) {
    this.getUserLocation();
  }

  async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation.update(() => [ coords.longitude, coords.latitude ]);
          resolve([ coords.longitude, coords.latitude ]);
        },
        (err) => {
          alert('No se pudo obtener la Geolocalización');
          console.log(err);
          reject();
        }
      )
    });
  }

  getPlacesByQuery(query: string) {
    if(!this.isUserLocationReady) throw Error('No existe ubicación');

    if(query.length===0) {
      this.isLoadingPlaces.set(false);
      this.places = [];
      this.mapService.cleanMap();
      return;
    }

    this.isLoadingPlaces.set(true);
    
    this.placesApi.get<Places>(`?q=${query}`, {
      params: {
        proximity: this.userLocation()!.join(',')
      }
    }).subscribe(res => {
      this.isLoadingPlaces.set(false);
      this.places = res.features;
      this.mapService.createMarkersFromPlaces(this.places, this.userLocation() as [number, number]);
    })
  }

  deletePlaces() {
    this.places = [];
  }
}
