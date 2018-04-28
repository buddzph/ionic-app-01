// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountProvider {

  constructor(public storage: Storage) {
    console.log('Hello AccountProvider Provider');
  }

  storeUser(param){
    this.storage.set('userinfo', param);
  }

  getUser(): any{
    return this.storage.get('userinfo').then((profile) => {
      return profile;
   });
  }
}
