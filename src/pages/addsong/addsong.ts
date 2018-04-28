import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ViewsongPage } from '../viewsong/viewsong';
import { AccountProvider } from '../../providers/account/account';

/**
 * Generated class for the AddsongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addsong',
  templateUrl: 'addsong.html',
})
export class AddsongPage {
  // arrUserInfo = [];
  arrViewSong = [];
  @ViewChild('songtitle') songtitle;
  @ViewChild('songlyrics') songlyrics;
  @ViewChild('songsinger') songsinger;

  constructor(private account: AccountProvider, private firedb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

  }

  alert(message: string){
    this.alertCtrl.create({
      title: 'Notice',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddsongPage');
  }

  saveSong() {
    this.account.getUser().then(data => {
      this.firedb.list('/songlist/').push({userid: data.userid, songtitle: this.songtitle.value, songlyrics: this.songlyrics.value})
      .then((item) => {
          this.firedb.object('songlist/' + item.key).update({songkey: item.key})
            .then(_ => console.log("New song added."))
            .catch(err => console.log(err, "Failed"));
            this.alert('New song added.');
            this.arrViewSong['songkey'] = item.key;
            this.arrViewSong['songtitle'] = this.songtitle.value;
            this.arrViewSong['songsinge'] = this.songsinger.value;
            this.arrViewSong['songlyrics'] = this.songlyrics.value;
            this.navCtrl.push(ViewsongPage,{songinfo:this.arrViewSong});
            this.songtitle.value = '';
            this.songlyrics.value = '';
      });
    });
  }
}
