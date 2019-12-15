import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NavController} from '@ionic/angular';
import { Router } from '@angular/router';

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
    id: string ;
    constructor(
      public http: HttpClient,
      public navCtrl: NavController,
      private router: Router,
  ) {}

  ngOnInit() {
      this.router.navigateByUrl('/contact/' + this.id);
  }
  ionViewDidEnter() {
      this.http.get('https://floating-retreat-70851.herokuapp.com/series?user_id=User1')

          .subscribe(data => {
          // @ts-ignore
          this.series = data;
          console.log(this.series);
        });
  }
    moveMessage() {
        this.navCtrl.navigateForward(`/messages`);
    }
}
