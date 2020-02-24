import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map'
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { LoginPage } from '../login/login';
import { Md5 } from '../../../node_modules/ts-md5/dist/md5';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  id: any;
  uid: any;
  firstname: any;
  lastname: any;
  designation: any;
  department: any;
  email: any;
  contactNo: any;
  password: any;
  cpassword: any;
  departments: any;
  admin_right: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpserviceProvider: HttpserviceProvider,
    public toastCtrl: ToastController) {

      // this.departments = ["A","B"];

      this.httpserviceProvider.getMethod('department/getAlldepartment').then(data => {
        this.departments = data;
        this.department = this.departments[0].name;
        console.log(this.departments);
  
      }).catch(error => {
        console.log(error);
      })

      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    if(this.cpassword == this.password){
      var hashpass = Md5.hashStr(this.password);
      this.httpserviceProvider.postMethod('employee', {
        "id": this.id,
        "Adhar_card": this.uid,
        "firstname": this.firstname,
        "lastname": this.lastname,
        "designation" : this.designation,
        "department": this.department,
        "contactNo": this.contactNo,
        "password": hashpass,
        "email": this.email,
        "admin_rights": this.admin_right
      }).then(data => {
        console.log(data);
        let toast = this.toastCtrl.create({
          message: data['response'],
          duration: 3000
        });
        toast.present();
        this.navCtrl.setRoot(LoginPage);

      }).catch(error => {
        console.log(error);
        let toast = this.toastCtrl.create({
          message: error.response,
          duration: 3000
        });
        toast.present();
      })
    }
    else{
      let toast = this.toastCtrl.create({
        message: "Password Missmatch",
        duration: 3000
      });
      toast.present();

    }
  }


  selectState(event){

  }
}
