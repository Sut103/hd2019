import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(public auth: AuthService) { }
  signOut() {
    this.auth.authSignOut();
  }
  ngOnInit() {
  }

}
