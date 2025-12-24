import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './app/core/guards/auth.guard';
import { TokenInterceptor } from './app/interceptors/token.interceptor';
import AOS from 'aos';
import { register } from 'swiper/element/bundle';
register();

// Initialize AOS
AOS.init();

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    AuthGuard,
    provideHttpClient(withInterceptors([TokenInterceptor])),
    importProvidersFrom(BrowserAnimationsModule)
  ]
});
