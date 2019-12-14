import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToastController, Platform, LoadingController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import {GoogleMaps, GoogleMap, GoogleMapOptions, Marker, Environment, MyLocation, BaseArrayClass} from '@ionic-native/google-maps/ngx';

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
    map: GoogleMap;
    loading: any;
    location =  { lat: null, lng: null };

    messages: {
        id: string,
        latlng: {
            lat: number,
            lng: number
        }
    }[] = [];

    constructor(
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public http: HttpClient,
        public geolocation: Geolocation
    ) { }

    async ngOnInit() {
        await this.loadMap();
        await this.loadMessage();
    }

    // ionViewDidEnter() {
    //     this.http.get('https://floating-retreat-70851.herokuapp.com/messages?series_id=series4')
    //         .subscribe(data => {
    //             // @ts-ignore
    //             this.messages = data;
    //         });
    // }

    loadMap() {
        Environment.setEnv({
            API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDq1bO1yts9SWbPwk3iP5DLeQ1y02sg3HA',
            API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDq1bO1yts9SWbPwk3iP5DLeQ1y02sg3HA'
        });

        this.location.lat = 35.7005247;
        this.location.lng = 139.7725077;

        const mapOptions: GoogleMapOptions = {
            controls: {
                compass: true,
                myLocationButton: true,
                myLocation: true,   // (blue dot)
                indoorPicker: true,
                zoom: false,          // android only
                mapToolbar: false     // android only
            },
            camera: {
                target: {
                    lat: this.location.lat,
                    lng: this.location.lng,
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
                url: '/assets/icon/red_tokyo32.png',
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

    async loadMessage() {
        //　ToDo: 再取得時にマーカを全部一回削除
        const msgArray: BaseArrayClass<any> = new BaseArrayClass<any>();
        await this.http.get('https://floating-retreat-70851.herokuapp.com/messages?series_id=series4')
            .subscribe((data: any[]) => {
                // @ts-ignore
                this.messages = data;
                data.forEach(message => {
                    msgArray.push({
                        position: { lat: message.latlng.lat, lng: message.latlng.lng},
                        dbId: message.id,
                        animation: 'DROP',
                        icon: {
                            url: '/assets/icon/tokyo32.png',
                            size: {
                                width: 32,
                                height: 32
                            },
                        }
                    });
                });
                msgArray.map((options) => {
                    this.map.addMarker(options);
                });
            });
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
        this.loadMessage();
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
