import { inject, Injectable, signal } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup, SourceSpecification } from 'mapbox-gl';
import { Feature } from '../interfaces/places.interface';
import { Directions, Route } from '../interfaces/directions.interface';
import { DirectionsApiClient } from '../api/directionsApiClient';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map = signal<Map|undefined>(undefined);
  markers: Marker[] = [];

  directionsApi = inject(DirectionsApiClient);

  public get isMapReady() : boolean {
    return !!this.map();
  }

  setMap(map: Map) {
    this.map.set(map);
  }
  
  flyTo(coords: LngLatLike) {
    if(!this.isMapReady) throw Error('El mapa no está inicializado');

    this.map()!.flyTo({
      zoom: 17,
      center: coords
    })
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {

    if(!this.map()) throw Error('Mapa no inicializado');

    this.markers.forEach(marker => marker.remove());
    const newMarkers = [];

    for (const place of places) {
      const { longitude, latitude } = place.properties.coordinates;
      const popup = new Popup()
        .setHTML(`
          <h6>${place.properties.name}</h6>
          <span>${place.properties.full_address}</span>
        `);

      const newMarker = new Marker()
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(this.map()!);
      
      newMarkers.push(newMarker);

      if(places.length === 0) return;

      //Map limits
      const bounds = new LngLatBounds();
      newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
      bounds.extend(userLocation);

      this.map()?.fitBounds(bounds, {
        padding: 200
      });
    }

    this.markers = newMarkers;
  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.directionsApi.get<Directions>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(res => this.drawLineString(res.routes[0]));
  }

  private drawLineString(route: Route) {
    console.log({kms: route.distance / 1000, duration: route.duration / 60});

    if(!this.map()) throw Error('Mapa no inicializado');

    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();
    coords.forEach(([ lng, lat ]) => bounds.extend([lng, lat]));

    this.map()?.fitBounds(bounds, {
      padding: 200
    });

    const sourceData: SourceSpecification = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    //Clean map layers
    if(this.map()?.getLayer('RouteString')) {
      this.map()?.removeLayer('RouteString');
      this.map()?.removeSource('RouteString');
    }

    this.map()?.addSource('RouteString', sourceData);
    this.map()?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        "line-cap": 'round',
        "line-join": 'round'
      },
      paint: {
        "line-color": 'blue',
        "line-width": 5
      }
    });
  }

  cleanMap() {
    // if(this.map()?.getLayer('RouteString')) {
    //   this.map()?.removeLayer('RouteString');
    //   this.map()?.removeSource('RouteString');
    // }

    // this.markers.forEach(marker => marker.remove());
  }
}
