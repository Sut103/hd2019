import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-my-series-page',
  templateUrl: './my-series-page.page.html',
  styleUrls: ['./my-series-page.page.scss'],
})
export class MySeriesPagePage implements OnInit {
  series: {
    id: string,
      name: string
  }[] = [];
  constructor(
      public http: HttpClient,
      public navCtrl: NavController,
  ) {
      this.series = [
          { id: '0', name: 'series1' },
          { id: '1', name: 'series2' },
          { id: '2', name: '日記' },
          { id: '3', name: 'ツイート' },
      ];
  }

  ngOnInit() {
  }
  // ionViewDidEnter() {
  //   // this.http.get('https://floating-retreat-70851.herokuapp.com/messages?series_id=series4')
  //     this.http.get('https://floating-retreat-70851.herokuapp.com/series')
  //
  //         .subscribe(data => {
  //         // @ts-ignore
  //         this.series = data;
  //         console.log(this.series);
  //       });
  // }
    moveMessage() {
        this.navCtrl.navigateForward('/messages', {
        });
    }
}
