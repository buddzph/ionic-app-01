import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditsongPage } from './editsong';

@NgModule({
  declarations: [
    EditsongPage,
  ],
  imports: [
    IonicPageModule.forChild(EditsongPage),
  ],
})
export class EditsongPageModule {}
