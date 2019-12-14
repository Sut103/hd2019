import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-my-series-page',
  templateUrl: './my-series-page.page.html',
  styleUrls: ['./my-series-page.page.scss'],
})
export class MySeriesPagePage implements OnInit {
  messages: {
    series_id: string,
  }[] = [];
  constructor(
      public http: HttpClient,
      public navCtrl: NavController,
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.http.get('https://floating-retreat-70851.herokuapp.com/messages?series_id=series4')
        .subscribe(data => {
          // @ts-ignore
          this.messages = data;
          console.log(this.messages);
        });
  }
  backAccount() {
    this.navCtrl.navigateForward('/account');
  }
}
