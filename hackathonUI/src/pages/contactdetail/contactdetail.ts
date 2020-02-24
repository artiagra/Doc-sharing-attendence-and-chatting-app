import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContactdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contactdetail',
  templateUrl: 'contactdetail.html',
})
export class ContactdetailPage {

  userinfo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userinfo = navParams.get('item');
    console.log(this.userinfo);
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactdetailPage');
  }

}
