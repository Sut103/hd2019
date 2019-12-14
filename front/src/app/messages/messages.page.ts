import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  messages: {
    id: string,
  }[] = [];
  constructor(
      public http: HttpClient,
  ) {
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
      this.http.get('https://floating-retreat-70851.herokuapp.com/messages?series_id=series1')
            .subscribe(data => {
            // @ts-ignore
           this.messages = data;
            console.log(this.messages);
          });
    }
  }
