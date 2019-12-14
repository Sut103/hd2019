import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MySeriesPagePage } from './my-series-page.page';

const routes: Routes = [
  {
    path: '',
    component: MySeriesPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySeriesPagePageRoutingModule {}
