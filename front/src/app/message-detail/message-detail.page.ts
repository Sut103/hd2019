import { Component, OnInit } from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.page.html',
  styleUrls: ['./message-detail.page.scss'],
})
export class MessageDetailPage implements OnInit {
  id: string;
  item: {
    id: string,
    latlng: {
      lat: number,
      lng: number
    }
  };
  myId = null;
  // tslint:disable-next-line:ban-types
  message: Object;
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      public navCtrl: NavController,
      public navParams: NavParams,
      public http: HttpClient
  ) {
    this.item = this.navParams.data.item;
  }


  ngOnInit() {
    // this.myId = this.activatedRoute.snapshot.paramMap.get('myid');
    // this.http.get('https://floating-retreat-70851.herokuapp.com/messages/' + this.item.id)
    //     .subscribe(data => {
    //       this.message = data;
    //       console.log(this.message);
    //     });
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });

  }

}
