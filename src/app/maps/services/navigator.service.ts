import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {
  public userCoords: [number, number];

  public constructor() {
    this.userCoords = [-75.74104996708131, 4.79531170562937];
    // this.getUserLocation()
    //   .then((coords) => {
    //     this.userCoords = coords;
    //   })
    //   .catch((error) => {
    //     alert('Current position could not be obtained');
    //     console.error(error);
    //   });
  }

  public async getUserCoords(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (geolocationPosition) => {
          const { longitude, latitude } = geolocationPosition.coords;
          const coords: [number, number] = [longitude, latitude];
          resolve(coords);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
