import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userinfo',
  templateUrl: 'userinfo.html',
})
export class UserinfoPage {
  firstname
  lastname
  contact
  email
  userid

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.firstname = this.navParams.get('userinfo').firstname;
    this.lastname = this.navParams.get('userinfo').lastname;
    this.contact = this.navParams.get('userinfo').contact;
    this.email = this.navParams.get('userinfo').email;
    this.userid = this.navParams.get('userinfo').userid;
    // console.log('userinfo: ', firstname);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserinfoPage');
  }

}
