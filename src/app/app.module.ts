import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LoggedinPage } from '../pages/loggedin/loggedin';
import { EdittodoitemPage } from '../pages/edittodoitem/edittodoitem';
import { UserinfoPage } from '../pages/userinfo/userinfo';
import { WelcomePage } from '../pages/welcome/welcome';
import { SonglistPage } from '../pages/songlist/songlist';
import { ViewsongPage } from '../pages/viewsong/viewsong';
import { AddsongPage } from '../pages/addsong/addsong';
import { EditsongPage } from '../pages/editsong/editsong';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AccountProvider } from '../providers/account/account';

// Initialize Firebase
const firebaseAuth = {
  apiKey: "AIzaSyD2N0vF-lo4G086aNXQuIxyFObQB6YerN4",
  authDomain: "my-first-app-10315.firebaseapp.com",
  databaseURL: "https://my-first-app-10315.firebaseio.com",
  projectId: "my-first-app-10315",
  storageBucket: "my-first-app-10315.appspot.com",
  messagingSenderId: "975251601533"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    LoginPage,
    RegisterPage,
    LoggedinPage,
    EdittodoitemPage,
    UserinfoPage,
    WelcomePage,
    SonglistPage,
    ViewsongPage,
    AddsongPage,
    EditsongPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    LoginPage,
    RegisterPage,
    LoggedinPage,
    EdittodoitemPage,
    UserinfoPage,
    WelcomePage,
    SonglistPage,
    ViewsongPage,
    AddsongPage,
    EditsongPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AccountProvider
  ]
})
export class AppModule {}
