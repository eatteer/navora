import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import mapboxgl from 'mapbox-gl';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

mapboxgl.accessToken = environment.mapboxAccessToken;

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
