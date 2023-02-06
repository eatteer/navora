import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { GeocodingResponse, Feature } from '../interfaces/geocoding.interfaces';
import { environment } from 'src/environments/environment';
import { NavigatorService } from './navigator.service';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private _results$ = new BehaviorSubject<Feature[]>([]);

  public constructor(
    private httpClient: HttpClient,
    private navigatorService: NavigatorService
  ) {}

  public getResults$(): Observable<Feature[]> {
    return this._results$.asObservable();
  }

  public search(text: string): Observable<GeocodingResponse> {
    const coords = this.navigatorService.userCoords.join(',');
    console.log(coords);
    const endpoint = `${environment.geocodingApiUrl}/${text}.json`;
    const params = new HttpParams()
      .set('proximity', coords)
      .set(
        'types',
        'place,postcode,address,district,country,region,locality,neighborhood,poi'
      )
      .set('limit', 5)
      .set('access_token', environment.mapboxAccessToken);
    return this.httpClient.get<GeocodingResponse>(endpoint, { params }).pipe(
      tap((response) => {
        this._results$.next(response.features);
      })
    );
  }
}
