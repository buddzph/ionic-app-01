import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { EdittodoitemPage } from '../edittodoitem/edittodoitem';
import { UserinfoPage } from '../userinfo/userinfo';
import { MenuController } from 'ionic-angular';

/**
 * Generated class for the LoggedinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedinPage {
  @ViewChild('item') todoitem;
  arrData = [];
  arrTodo = [];
  /*firstname = null;
  lastname = null;
  contact = null;
  email = null;*/
  arrUserInfo = [];
  userid = null;

  constructor(private firedb: AngularFireDatabase, public navCtrl: NavController, public menuCtrl: MenuController, public alertCtrl: AlertController) {
    // this.email = fire.auth.currentUser.email;
    this.firedb.list('/registration/').valueChanges().subscribe(_data => {
      this.arrData = _data;
      // console.log(this.arrData);
      this.arrData.forEach(item => {
        this.arrUserInfo['firstname'] = item.firstname;
        this.arrUserInfo['lastname'] = item.lastname;
        this.arrUserInfo['contact'] = item.contact;
        this.arrUserInfo['email'] = item.email;
        this.arrUserInfo['userid'] = item.userid;  
        this.firedb.list('/todoitem/', ref => ref.orderByChild('userid').equalTo(this.arrUserInfo['userid'])).valueChanges().subscribe(_datatodo => {
          this.arrTodo = _datatodo;
        });
      });
    });
  }

  alert(message: string){
    this.alertCtrl.create({
      title: 'Notice',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoggedinPage');
  }

  saveTodoItem() {
    if(this.todoitem.value != ''){
      this.firedb.list('/todoitem/').push({userid: this.arrUserInfo['userid'], todoitem: this.todoitem.value})
        .then((item) => {
          // console.log(item.key);
          this.firedb.object('todoitem/' + item.key).update({item_key: item.key})
          .then(_ => console.log("New item added."))
          .catch(err => console.log(err, "Failed"));
          this.alert('New item added.');
          this.todoitem.value = '';        
        });
    }else
      this.alert('Item is required.')
  }

  edititempage(param?:null) {
    this.navCtrl.push(EdittodoitemPage,{item:param});
  }

  userinfo() {
    this.navCtrl.push(UserinfoPage, {userinfo:this.arrUserInfo});
  }

}
