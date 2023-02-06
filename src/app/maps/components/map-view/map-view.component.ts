import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';
import { NavigatorService } from '../../services/navigator.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styles: [],
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('map')
  public mapRef!: ElementRef<HTMLDivElement>;

  public constructor(
    private navigatorService: NavigatorService,
    private mapService: MapService
  ) {}

  public ngAfterViewInit(): void {
    const map = new Map({
      container: this.mapRef.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.navigatorService.userCoords,
      zoom: this.mapService.defaultZoom,
    });

    new Marker({ color: 'red' })
      .setLngLat(this.navigatorService.userCoords)
      .addTo(map);

    this.mapService.map = map;
  }
}
