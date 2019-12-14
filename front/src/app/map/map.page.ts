import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: GoogleMap;

  constructor() { }

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
        zoom: 17,
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

  onRefrechClick() {
    console.log('refresh');
  }

  onAddClick() {
    console.log(this.location);
  }

}
