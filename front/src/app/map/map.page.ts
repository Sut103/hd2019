import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  constructor(
      public auth: AngularFireAuth
  ) {
  }

  ngOnInit() {
  }

}
