import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AboutPage } from '../about/about';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

  openAbout() {
    this.navCtrl.push(AboutPage);
  }

  login() {
    this.navCtrl.push(LoginPage);
  }
  
  register() {
    this.navCtrl.push(RegisterPage);
  }
}
