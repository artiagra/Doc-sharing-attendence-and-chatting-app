import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';



/**
 * Generated class for the NewmeetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-newmeeting',
  templateUrl: 'newmeeting.html',
})
export class NewmeetingPage {
  model: any = {};
  fileLoc: any;
  set = false;
  ext: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpserviceProvider: HttpserviceProvider,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewmeetingPage');
  }
  create(meetingData) {
    if (meetingData.meetingtitle !== null || meetingData.meetingtitle !== "") {
      console.log(meetingData);
      // var tp = this.model.myDate1;
      // tp = tp.replace('T', ' ');
      // tp = tp.replace('Z', '');
      // console.log(tp);
      console.log(this.model.myDate);
      console.log(this.model.myDate + " " + this.model.totime + ":00 ");
      console.log(this.model.myDate + " " + this.model.fromtime + ":00");

      this.httpserviceProvider.postMethod('meetings', {
        "agenda": this.model.agenda,
        "description": this.model.description,
        //  "meetingDate": tp,
        "meetingtitle": this.model.meetingtitle,
        "venue": this.model.venue,
        "meetingDate": this.model.myDate + " " + this.model.fromtime + ":00",
        "meetingDateEnd": this.model.myDate + " " + this.model.totime + ":00"

      }).then(data => {
        console.log(data);
        let toast = this.toastCtrl.create({
          message: data['response'],
          duration: 3000
        });
        toast.present();
        this.navCtrl.pop();

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
        message: "Enter Title",
        duration: 3000
      });
      toast.present();
    }

  }




  // pickFile() {
  //   this.fileChooser.open()
  //     .then(uri => {
  //       console.log(uri);
  //       this.filePath.resolveNativePath(uri)
  //         .then(filePath => {
  //           var res = filePath.split("/");
  //           console.log(res.length);
  //           this.set = true;
  //           this.fileLoc = res[res.length - 1];
  //           var exti = this.fileLoc.split(".");
  //           console.log(exti);
  //           if (exti.length > 0) {
  //             this.ext = exti[1];
  //           }
  //           else {
  //             this.ext = "file";
  //           }
  //           console.log(filePath);
  //         })
  //         .catch(err => console.log(err));

  //     })
  //     .catch(e => console.log(e));
  // }

  clear() {
    this.set = false;

  }


}
