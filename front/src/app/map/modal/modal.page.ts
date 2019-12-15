import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage {
  @Input() data: any;

  constructor(
      public navParams: NavParams,
      public modalCtrl: ModalController,
  ) {
    this.data = navParams.get('data');
    console.log(navParams.get('data'));
  }

  // ngOnInit() {
  // }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
