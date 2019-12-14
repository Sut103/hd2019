import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToastController, Platform, LoadingController} from '@ionic/angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  MyLocation
} from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: GoogleMap;
  loading: any;

  constructor(
      public loadingCtrl: LoadingController,
      public toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDq1bO1yts9SWbPwk3iP5DLeQ1y02sg3HA',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDq1bO1yts9SWbPwk3iP5DLeQ1y02sg3HA'
    });

    // this.location.lat = 35.7005247;
    // this.location.lng = 139.7725077;

    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 35.7005247,
          lng: 139.7725077
        },
        zoom: 16,
      }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);

    const marker: Marker = this.map.addMarkerSync({
      position: {
        lat: 35.7005247,
        lng: 139.7725077
      },
      icon: {
        url: '/assets/icon/tokyo32.png',
        size: {
          width: 32,
          height: 32
        },
      },
      rotation: 32,
      animation: 'DROP',
    });
    // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //   alert('clicked');
    // });
  }

  async onRefrechClick() {
    this.map.clear();

    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loading.present();

    this.map.getMyLocation().then((location: MyLocation) => {
      this.loadingCtrl.dismiss();
      console.log(JSON.stringify(location, null, 2));

      this.map.animateCamera({
        // target: location.latLng,
        target: {
          lat: 35.7005247,
          lng: 139.7725077
        },
        zoom: 17,
      });

      const marker: Marker = this.map.addMarkerSync({
        position: {
          lat: 35.7005247,
          lng: 139.7725077
        },
        icon: {
          url: '/assets/icon/tokyo32.png',
          size: {
            width: 32,
            height: 32
          },
        },
        rotation: 32,
        animation: 'DROP',
      });

      marker.showInfoWindow();
    }).catch(err => {
      this.loading.dismiss();
      this.showToast(err.error_message);
    });
  }

  onAddClick() {
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }

}
