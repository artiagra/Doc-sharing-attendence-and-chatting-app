import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map'
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { ContactdetailPage } from '../contactdetail/contactdetail';

/**
 * Generated class for the DirectoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-directory',
  templateUrl: 'directory.html',
})
export class DirectoryPage {

  employeeData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpserviceProvider: HttpserviceProvider, 
    public alertCtrl: AlertController) {

    this.httpserviceProvider.getMethod('employee/getAllEmployees').then(data => {
      this.employeeData = data;
      console.log(this.employeeData);

    }).catch(error => {
      console.log(error);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectoryPage');
  }
contact1(item){
  if (this.employeeData != "No results found for cab schedule in database"){
    this.navCtrl.push(ContactdetailPage, {item:item})
  }

}








 // getEmployee(item) {
   // if (this.employeeData != "No results found for cab schedule in database") {
     // let alert = this.alertCtrl.create({
//title: item.firstname + " " + item.lastname,
       // subTitle: "<table><tr><td>" + "<b>User ID</b> : " + "</td>" + "<td>" + item.id + "</td></tr>" + "<br>" + "<tr><td>" + "<b>Contact No</b> : " + "</td><td>" + item.contactNo + "</td></tr>",
       // buttons: ['OK']
     // });
    //  alert.present();
   // }
 // }

}
