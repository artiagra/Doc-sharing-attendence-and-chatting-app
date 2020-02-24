import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map'
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';

/**
 * Generated class for the DepartmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-department',
  templateUrl: 'department.html',
})
export class DepartmentPage {

  dept: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpserviceProvider: HttpserviceProvider) {

    var dname = this.httpserviceProvider.getdid();

    this.httpserviceProvider.getMethod('department/getdepartmentByName/'+ dname).then(data => {
      this.dept = data;
      console.log(data);

    }).catch(error => {
      console.log(error);
    })


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad DepartmentPage');
  }

}
