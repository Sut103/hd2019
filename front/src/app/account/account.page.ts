import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  constructor(
      public auth: AuthService,
      public navCtrl: NavController,
) { }
  signOut() {
    this.auth.authSignOut();
  }
    nextMySeries() {
        this.navCtrl.navigateForward('/my-series-page');
    }
  ngOnInit() {
  }

}
