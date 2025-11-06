import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { routes } from './app.routes';

const loggerConfig = LoggerModule.forRoot({
  level: NgxLoggerLevel.DEBUG,
  serverLoggingUrl: '/api/logs',
  serverLogLevel: NgxLoggerLevel.ERROR,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    ...(loggerConfig.providers || []),
  ],
};
