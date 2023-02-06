import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { FlyToMyLocationComponent } from './components/fly-to-my-location/fly-to-my-location.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    MapPageComponent,
    MapViewComponent,
    FlyToMyLocationComponent,
    SearchBarComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [MapPageComponent],
})
export class MapsModule {}
