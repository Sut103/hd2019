import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RouterModule } from '@angular/router';

import { GoogleMaps } from '@ionic-native/google-maps/ngx';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // Geolocation,
    GoogleMaps,
    AngularFireAuthGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
