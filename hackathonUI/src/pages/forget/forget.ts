import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { Md5 } from '../../../node_modules/ts-md5/dist/md5';
/**
 * Generated class for the ForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {
  matches: String[];
  isRecording = false;
  id: any;
  pass: any;
  cpass: any;
  contact: any;
  otp: any;

  begin = true;
  mid = false;
  end = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpserviceProvider: HttpserviceProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }


  validateUser() {
    this.httpserviceProvider.getMethod('verifyUser/' + this.id + '/' + this.contact).then(data => {
      console.log(data);
      if (data["validity"] === "1") {
        let toast = this.toastCtrl.create({
          message: data["response"],
          duration: 3000
        });
        toast.present();
        this.mid = true;
        this.begin = false;
      }
    }).catch(error => {
      let toast = this.toastCtrl.create({
        message: error.response,
        duration: 3000
      });
      toast.present();
    })
  }

  validateOtp() {
    var otpdata = {
      "id": this.id,
      "otp": this.otp
    }
    this.httpserviceProvider.postMethod('verifyOTP', otpdata).then(data => {
      console.log(data);
      if (data["validity"] === "1") {
        let toast = this.toastCtrl.create({
          message: data["response"],
          duration: 3000
        });
        toast.present();
        this.mid = false;
        this.end = true;
      }

    }).catch(error => {
      let toast = this.toastCtrl.create({
        message: error.response,
        duration: 3000
      });
      toast.present();
    })
  }

  updatepassword() {

    if (this.pass === this.cpass) {
      this.httpserviceProvider.getMethod('employee/getEmployeeById//' + this.id).then(data => {
        console.log(data);
        var user = data;
        if (user.hasOwnProperty('response')) {
          //alert(user.response);
          let toast = this.toastCtrl.create({
            message: user["response"],
            duration: 3000
          });
          toast.present();
        }
        else {
          let hashpass = Md5.hashStr(this.pass);
          var userUpdateData = {
            "adminRights": user["adminRights"],
            "contactNo": user["contactNo"],
            "department": user["department"],
            "designation": user["designation"],
            "password": hashpass,
            "email": user["email"],
            "id": user["id"],
            "lastname": user["lastname"]

          };
          this.httpserviceProvider.putMethod('employee/updateEmployee', userUpdateData).then(data => {
            console.log(data);
            let toast = this.toastCtrl.create({
              message: data["response"],
              duration: 3000
            });
            toast.present();

            this.navCtrl.pop();
          }).catch(error => {
            let toast = this.toastCtrl.create({
              message: error.response,
              duration: 3000
            });
            toast.present();
          })

        }
      }).catch(error => {
        let toast = this.toastCtrl.create({
          message: error.response,
          duration: 3000
        });
        toast.present();
      })
    }
    else {
      let toast = this.toastCtrl.create({
        message: "Password Doesn't Match",
        duration: 3000
      });
      toast.present();
    }

  }

  cancel() {
    this.navCtrl.pop();
  }

}
