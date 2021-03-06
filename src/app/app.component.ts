import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SonglistPage } from '../pages/songlist/songlist';
import { UserinfoPage } from '../pages/userinfo/userinfo';

import { AccountProvider } from '../providers/account/account';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  arrUserInfo = [];
  // items: Array<{title: string}>;

  constructor(private account: AccountProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    /*this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Menu ' + i
      });
    }*/
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  songlist() {
    this.account.getUser().then(data => {
      this.nav.push(SonglistPage, {userinfo: data});
    });
  }

  userinfo() {
    this.account.getUser().then(data => {
      this.nav.push(UserinfoPage, {userinfo: data});
    });
  }

  logout() {
    this.nav.setRoot(HomePage);
  }
}

