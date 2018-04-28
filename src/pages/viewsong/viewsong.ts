import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditsongPage } from '../editsong/editsong';
import { SonglistPage } from '../songlist/songlist';
import { AccountProvider } from '../../providers/account/account';

/**
 * Generated class for the ViewsongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewsong',
  templateUrl: 'viewsong.html',
})
export class ViewsongPage {
  songkey
  songtitle
  songsinger
  songlyrics

  constructor(private account: AccountProvider, private firedb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.songkey = this.navParams.get('songinfo').songkey;
    this.songtitle = this.navParams.get('songinfo').songtitle;
    this.songsinger = this.navParams.get('songinfo').songsinger;
    this.songlyrics = this.navParams.get('songinfo').songlyrics;    
  }

  alert(message: string){
    this.alertCtrl.create({
      title: 'Notice',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewsongPage');
  }

  editsong() {
    this.navCtrl.push(EditsongPage,{songinfo: this.navParams.get('songinfo')});
  }

  removesong() {
    this.firedb.object('songlist/' + this.songkey).remove()
    .then(_ => 
      (this.alert('Selected song deleted'),
        this.account.getUser().then(data => {
          this.navCtrl.push(SonglistPage, {userinfo: data})
        })
      )
    ).catch(err => this.alert('Error on delete.'));
  }
}
