import { Component } from '@angular/core';
import { NavigatorService } from '../../services/navigator.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-fly-to-my-location',
  templateUrl: './fly-to-my-location.component.html',
  styles: [],
})
export class FlyToMyLocationComponent {
  public constructor(
    private navigatorService: NavigatorService,
    private mapService: MapService
  ) {}

  public flyToMyLocation(): void {
    this.mapService.flyTo(this.navigatorService.userCoords);
  }
}
