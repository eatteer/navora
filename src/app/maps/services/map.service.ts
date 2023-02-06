import { Injectable } from '@angular/core';
import { LngLatBounds, Map, Marker } from 'mapbox-gl';
import { Feature } from '../interfaces/geocoding.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public map!: Map;
  public defaultZoom = 15;

  public featureMarkers: Marker[] = [];

  public constructor() {}

  public createFeatureMarkers(features: Feature[]): void {
    // Remove current markers from map
    this.removeFeatureMarkers();

    // Create new markers from results
    const markers = features.map((feature) => {
      const [lng, lat] = feature.center;
      const marker = new Marker().setLngLat([lng, lat]).addTo(this.map);
      return marker;
    });
    this.featureMarkers = markers;

    const bounds = new LngLatBounds();
    this.featureMarkers.forEach((marker) => {
      bounds.extend(marker.getLngLat());
    });
    this.map.fitBounds(bounds, {
      padding: 200,
    });
  }

  public removeFeatureMarkers(): void {
    this.featureMarkers.forEach((marker) => marker.remove());
  }

  public flyTo(center: [number, number]): void {
    this.map.flyTo({
      zoom: this.defaultZoom,
      center,
    });
  }
}
