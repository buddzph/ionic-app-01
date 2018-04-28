import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserinfoPage } from '../userinfo/userinfo';
import { SonglistPage } from '../songlist/songlist';
import { AccountProvider } from '../../providers/account/account';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  constructor(private account: AccountProvider, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  userinfo() {
    this.account.getUser().then(data => {
      this.navCtrl.push(UserinfoPage, {userinfo: data});
    });
  }

  songlist() {
    this.account.getUser().then(data => {
      this.navCtrl.push(SonglistPage, {userinfo: data});
    });
  }
}
