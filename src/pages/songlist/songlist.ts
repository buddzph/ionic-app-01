import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ViewsongPage } from '../viewsong/viewsong';
import { AddsongPage } from '../addsong/addsong';

import { AccountProvider } from '../../providers/account/account';

/**
 * Generated class for the SonglistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-songlist',
  templateUrl: 'songlist.html',
})
export class SonglistPage {
  arrUserInfo = [];
  arrSonglist = [];
  subscription:any;

  constructor(private account: AccountProvider, private firedb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.account.getUser().then(data => {
      this.firedb.list('/songlist/', ref => ref.orderByChild('userid').equalTo(data.userid)).valueChanges().subscribe(_data => {
        this.arrSonglist = _data;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SonglistPage');
  }

  viewsong(param?:null) {
    this.navCtrl.push(ViewsongPage,{songinfo:param});
  }

  addsong() {
    this.account.getUser().then(data => {
      this.navCtrl.push(AddsongPage,{userinfo: data});
    });
  }
}
