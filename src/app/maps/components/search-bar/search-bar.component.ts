import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap, tap } from 'rxjs';
import { GeocodingService } from '../../services/geocoding.service';
import { Feature } from '../../interfaces/geocoding.interfaces';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styles: [],
})
export class SearchBarComponent implements OnInit {
  public selectedFeatureId = '';
  public searchControl: FormControl<string> = new FormControl('', {
    nonNullable: true,
  });

  public showResults = false;
  public featureResults: Feature[] = [];

  public constructor(
    private geocodingService: GeocodingService,
    private mapService: MapService
  ) {
    this.geocodingService.getResults$().subscribe((features) => {
      this.featureResults = features;
    });
  }

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        filter((text) => {
          const isNotEmpty = text.trim().length > 0;
          if (!isNotEmpty) this.handleEmptySearch();
          return isNotEmpty;
        }),
        debounceTime(500),
        switchMap((text) => this.geocodingService.search(text)),
        tap(() => (this.showResults = true))
      )
      .subscribe((response) => {
        this.mapService.createFeatureMarkers(response.features);
      });
  }

  private handleEmptySearch(): void {
    this.showResults = false;
    this.featureResults = [];
    this.mapService.removeFeatureMarkers();
  }

  public flyToFeature(feature: Feature): void {
    this.showResults = false;
    this.selectedFeatureId = feature.id;
    this.mapService.flyTo(feature.center as [number, number]);
  }

  public onFocusInput(): void {
    if (this.featureResults.length > 0) this.showResults = true;
  }
}
