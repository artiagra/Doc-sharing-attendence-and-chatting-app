import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';

/**
 * Generated class for the AddminutesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addminutes',
  templateUrl: 'addminutes.html',
})
export class AddminutesPage {
  model: any = {};
  meetingdetail: any;
  id: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpserviceProvider: HttpserviceProvider) {
    this.id = 28;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddminutesPage');
  }
  addminutes() {
    this.httpserviceProvider.getMethod('meetings/getMeetingById/' + this.id).then(data => {
      this.meetingdetail = data;
      console.log(this.meetingdetail);

      this.httpserviceProvider.putMethod('meetings/updateMeeting', {
        "action": this.model.action,
        "agenda": this.meetingdetail.agenda,
        "decision": this.model.decision,
        "description": this.meetingdetail.description,
        //"fileUrl"
        "id": this.id,
        "meetingDate": this.meetingdetail.meetingDate,
        "meetingDateEnd": this.meetingdetail.meetingDateEnd,
        "meetingtitle": this.meetingdetail.meetingtitle,
        "updates": this.model.updates,
        "venue": this.meetingdetail.venue
      }).then(data => {


      }).catch(error => {

      })


      console.log(data);

    }).catch(error => {
      console.log(error);
    })
  }
}
