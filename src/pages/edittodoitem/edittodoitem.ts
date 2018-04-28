import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoggedinPage } from '../loggedin/loggedin';

/**
 * Generated class for the EdittodoitemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edittodoitem',
  templateUrl: 'edittodoitem.html',
})
export class EdittodoitemPage {
  @ViewChild('item') item;
  todoitem
  userid
  item_key

  constructor(private firedb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    // console.log('pp - ',navParams.get("item"));
    this.todoitem = navParams.get("item").todoitem;
    this.userid = navParams.get("item").userid;
    this.item_key = navParams.get("item").item_key;
  }

  alert(message: string){
    this.alertCtrl.create({
      title: 'Notice',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  ionViewDidLoad() {
    
  }

  updateTodoItem() {
    this.firedb.object('todoitem/' + this.item_key).update({todoitem: this.item.value})
    .then(_ => this.alert('Updated'))
    .catch(err => this.alert('Error on update.'));
  }

  deleteTodoItem() {
    this.firedb.object('todoitem/' + this.item_key).remove()
    .then(_ => 
      (this.alert('Deleted'), this.navCtrl.setRoot( LoggedinPage ))
    ).catch(err => this.alert('Error on delete.'));
  }

}
