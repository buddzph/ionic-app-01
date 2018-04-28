import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
// import { LoggedinPage } from '../loggedin/loggedin';
import { WelcomePage } from '../welcome/welcome';

import { AccountProvider } from '../../providers/account/account';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('email') email;
  @ViewChild('password') pword;
  arrUserInfo = [];
  arrData = [];

  constructor(private account:AccountProvider,private fire: AngularFireAuth, private firedb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  alert(message: string){
    this.alertCtrl.create({
      title: 'Notice',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  signIn(){
    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.pword.value)
    .then( data => {
      // console.log(this.fire.auth.currentUser.email);
      // this.navCtrl.setRoot( LoggedinPage );
      this.firedb.list('/registration/', ref => ref.orderByChild('email').equalTo(this.email.value)).valueChanges().subscribe(d => {
        this.arrData = d;
        this.arrData.forEach(item => {
          this.arrUserInfo['firstname'] = item.firstname;
          this.arrUserInfo['lastname'] = item.lastname;
          this.arrUserInfo['contact'] = item.contact;
          this.arrUserInfo['email'] = item.email;
          this.arrUserInfo['userid'] = item.userid;
        });
        this.account.storeUser(this.arrUserInfo);
        this.navCtrl.setRoot(WelcomePage, {userinfo:this.arrUserInfo});
      });
    })
    .catch( error => {
      // console.log(error.message);
      this.alert(error.message);
    })
  }

}
