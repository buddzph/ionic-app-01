import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddsongPage } from './addsong';

@NgModule({
  declarations: [
    AddsongPage,
  ],
  imports: [
    IonicPageModule.forChild(AddsongPage),
  ],
})
export class AddsongPageModule {}
