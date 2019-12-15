import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MySeriesPagePageRoutingModule } from './my-series-page-routing.module';

import { MySeriesPagePage } from './my-series-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MySeriesPagePageRoutingModule
  ],
  declarations: [MySeriesPagePage]
})
export class MySeriesPagePageModule {}
