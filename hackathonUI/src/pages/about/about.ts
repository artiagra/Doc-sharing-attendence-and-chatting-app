import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map'
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';

@Component({
  selector: 'about-list',
  templateUrl: 'about.html'
})
export class AboutPage {

  userid: any;
  userdata: any;
  firstname: any;
  lastname: any;
  contactNo: any;
  department: any;
  designation: any;
  email: any;
  /*
  contactNo:9876543201
  department:"computer"
  designation:"developer"
  email:"vinay@gmail.com"
  firstname:"vinay"
  id:212612730
  lastname:"varekar"
  */
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpserviceProvider: HttpserviceProvider) {
    this.userid = this.httpserviceProvider.getUserId();

    this.httpserviceProvider.getMethod('employee/getEmployeeById/' + this.userid).then(data => {
      this.userdata = data;
      this.firstname= this.userdata.firstname;
      this.lastname= this.userdata.lastname;
      this.contactNo= this.userdata.contactNo;
      this.department = this.userdata.department;
      this.designation = this.userdata.designation;
      this.email = this.userdata.email;
      console.log(data);

    }).catch(error => {
      console.log(error);
    })

  }
}
