import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
      public auth: AuthService,
      public afAuth: AngularFireAuth
  ) { }
  signOut() {
    this.auth.authSignOut();
  }
  ngOnInit() {
    console.log(this.afAuth.auth.currentUser.getIdToken());
  }

}
