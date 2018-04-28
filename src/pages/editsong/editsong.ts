import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the EditsongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editsong',
  templateUrl: 'editsong.html',
})
export class EditsongPage {
  @ViewChild('songtitle') songtitle;
  @ViewChild('songsinger') songsinger;
  @ViewChild('songlyrics') songlyrics;
  songkey
  view_song_title
  view_song_singer
  view_song_lyrics

  constructor(private firedb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.songkey = this.navParams.get('songinfo').songkey;
    this.view_song_title = this.navParams.get('songinfo').songtitle;
    this.view_song_singer = this.navParams.get('songinfo').songsinger;
    this.view_song_lyrics = this.navParams.get('songinfo').songlyrics;
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Notice',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditsongPage');
  }

  updateSong(){
    this.firedb.object('songlist/' + this.songkey).update({songtitle: this.songtitle.value, songsinger: this.songsinger.value, songlyrics: this.songlyrics.value})
    .then(_ => this.alert('Updated'))
    .catch(err => this.alert('Error on update.'));
  }
}
