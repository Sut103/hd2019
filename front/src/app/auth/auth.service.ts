import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {NavController, AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      public afAuth: AngularFireAuth,
      public navController: NavController,
      public alertController: AlertController
  ) {}

  authSignUp(login: { email: string, password: string }) {
    return this.afAuth.auth
        .createUserWithEmailAndPassword(login.email, login.password)
        .then((res) => {
            this.navController.navigateForward('/');
        })
        .catch(async error => {
            this.alertError(error);
            throw error;
        });
  }
  authSignIn(login: {email: string, password: string}) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(login.email, login.password)
      .then(() => this.navController.navigateForward('/'))
      .catch(async error => {
        this.alertError(error);
        throw error;
      });
  }
  authSignOut() {
    return this.afAuth.auth.signOut()
        .then(() => this.navController.navigateRoot('/auth/signin'))
        .catch(async error => {
            this.alertError(error);
            throw error;
        });
  }
  async alertError(e) {
      const alert = await this.alertController.create({
          header: e.code,
          message: e.message,
          buttons: ['閉じる'],
      });
      await alert.present();
  }
}


