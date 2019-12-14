import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  messages: {
    series_id: string,
  }[] = [];
  constructor(
      public auth: AuthService,
      public http: HttpClient,
) { }
  signOut() {
    this.auth.authSignOut();
  }
  ionViewDidEnter() {
    this.http.get('https://floating-retreat-70851.herokuapp.com/messages?series_id=series4')
        .subscribe(data => {
          // @ts-ignore
          this.messages = data;
          console.log(this.messages);
        });
  }
  ngOnInit() {
  }

}
