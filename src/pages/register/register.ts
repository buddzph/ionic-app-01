import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
// import { LoggedinPage } from '../loggedin/loggedin';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('firstname') firstname;
  @ViewChild('lastname') lastname;
  @ViewChild('contact') contact;
  @ViewChild('email') email;
  @ViewChild('password') pword;

  constructor(private firedb: AngularFireDatabase, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Notice',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registerUser() {
    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.pword.value)
    .then(data => {
      // console.log('got data', data);
      // console.log('got data', this.fire.auth.currentUser);
      this.firedb.list('/registration/').push({userid: this.fire.auth.currentUser.uid, firstname: this.firstname.value, lastname: this.lastname.value, contact: this.contact.value, email: this.email.value, password: this.pword.value})
      .then((item) => {
        // console.log(item.key);
        this.firedb.object('registration/' + item.key).update({userid: item.key})
        .then(_ => console.log("Updated"))
        .catch(err => console.log(err, "Failed"));
        this.alert('Registration successful.');   
        // this.navCtrl.setRoot( LoggedinPage ); // first app
        this.navCtrl.setRoot( WelcomePage );
      });
    })
    .catch(error => {
      // console.log('got an error', error);
      this.alert(error.message);
    })
  }

}
