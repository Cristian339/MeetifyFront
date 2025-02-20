import {bootstrapApplication} from '@angular/platform-browser';
import {
  PreloadAllModules,
  provideRouter,
  RouteReuseStrategy,
  withComponentInputBinding,
  withPreloading
} from '@angular/router';
import {IonicRouteStrategy, provideIonicAngular} from '@ionic/angular/standalone';

import {routes} from './app/app.routes';
import {AppComponent} from './app/app.component';
import {provideHttpClient} from "@angular/common/http";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: PathLocationStrategy },  // 🔥 FORZA RUTAS SIN #
    provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules)),
    provideIonicAngular(),
    provideHttpClient(),
  ],
});
