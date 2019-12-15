import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  series: any[] = [];
    myId = null;
  constructor(
      public navCtrl: NavController,
      public http: HttpClient,
      private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
      this.myId = this.activatedRoute.snapshot.paramMap.get('myid');
  }

  ionViewDidEnter() {
      this.http.get('https://floating-retreat-70851.herokuapp.com/messages?series_id=dFiPhsi9AvjQYfxG8ddF')
          .subscribe(data => {
            // @ts-ignore
           this.series = data;
          });
    }

    openMessageDetailPage(id) {
      this.navCtrl.navigateForward(`/message-detail/${id}`);
    }
  }
