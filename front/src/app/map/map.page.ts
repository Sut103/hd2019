import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('Map', {static: false}) mapElement: ElementRef;
  map: any;
  mapOptions: any;
  location =  { lat: null, lng: null };
  markerOptions: any;
  marker: any;
  apiKey: any = 'AIzaSyDq1bO1yts9SWbPwk3iP5DLeQ1y02sg3HA';

  constructor(
      public geolocation: Geolocation
  ) {
    const script = document.createElement('script');
    script.id = 'googleMap';
    if (this.apiKey) {
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
    } else {
      script.src = 'https://maps.googleapis.com/maps/api/js?key=';
    }
    document.head.appendChild(script);

    this.geolocation.getCurrentPosition().then((position) =>  {
      this.location.lat = 35.7005247;
      this.location.lng = 139.7725077;
      // this.location.lat = position.coords.latitude;
      // this.location.lng = position.coords.longitude;
    });
    this.mapOptions = {
      center: this.location,
      zoom: 17,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    };
    this.markerOptions = {
      position: this.location,
      map: null,
    }
    setTimeout(() => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
      this.markerOptions.map = this.map;
      this.marker = new google.maps.Marker(this.markerOptions);
    }, 1000);
  }

  ngOnInit() {
  }

  onRefrechClick() {
    console.log('refresh');
  }

  onAddClick() {
    console.log(this.location);
  }

}
