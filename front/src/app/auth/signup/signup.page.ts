import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  login: {
    email: string,
    password: string;
  } = {
    email: null,
    password: null
  };
  constructor(public auth: AuthService) { }
  ngOnInit() {
  }

  SignUp() {
    this.auth.authSignUp(this.login);
  }
}
