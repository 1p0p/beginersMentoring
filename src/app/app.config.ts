import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideHttpClient } from '@angular/common/http';
import {withFetch} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideClientHydration(),
    provideHttpClient(withFetch()), provideAnimations(), provideAnimations()
  ] // для 17 нгуляра чтоб подключить к httpCThe ngModel directive is a directive that is used to bind the values of the HTML controls (input, select, and textarea) or any custom form controls, and stores the required user value in a variable and we can use that variable whenever we require that value.lientModule
 };

