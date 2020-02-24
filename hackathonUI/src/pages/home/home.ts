import { Component } from '@angular/core';
import { NavController, ToastController, Events, MenuController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { NewmeetingPage } from '../newmeeting/newmeeting';
import 'rxjs/add/operator/map'
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { AddminutesPage } from '../addminutes/addminutes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  meet: any;
  meetingData: any;
  pastmeetings: any;
  futuremeetings: any;
  uerRole: any;
  today: any;
  past: any;
  future: any;


  constructor(public navCtrl: NavController, private httpserviceProvider: HttpserviceProvider,
    public toastCtrl: ToastController, public events: Events, public menu: MenuController) {
    this.menu.enable(true);


    this.meet = 'Today';

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.uerRole = this.httpserviceProvider.getuerRole();

    this.getTodaysMeetings();
    this.getPastMeetings();
    this.getFutureMeetings();
    // this.initializeItems();
    events.publish('user:login');

  }

  ionViewDidLoad() {
    this.getTodaysMeetings();
    this.getPastMeetings();
    this.getFutureMeetings();
  }
  
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!

    this.navCtrl.push(DetailsPage, {
      item: item
    });
  }

 
  getItems(ev: any) {

    console.log(ev);
    console.log(this.meet);
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    if (this.meet === 'Today') {
      if (val && val.trim() != '') {
        this.today = this.today.filter((item) => {
          console.log(item.meetingtitle);
          return (item.meetingtitle.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      else {
        this.today = this.meetingData;
      }


    }
    else if (this.meet === 'Past') {
      if (val && val.trim() != '') {
        this.past = this.past.filter((item) => {
          console.log(item.meetingtitle);
          return (item.meetingtitle.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      else {
        this.past = this.pastmeetings;
      }
    }
    else if (this.meet === 'Up Comming') {
      if (val && val.trim() != '') {
        this.future = this.future.filter((item) => {
          console.log(item.meetingtitle);
          return (item.meetingtitle.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      else {
        this.future = this.futuremeetings;
      }

    }

    // if the value is an empty string don't filter the items

  }

  addMinutes() {
    this.navCtrl.push(AddminutesPage);

  }

  getTodaysMeetings() {

    this.httpserviceProvider.getMethod('meetings/getMeetingforToday').then(data => {
      this.meetingData = data;
      this.today = this.meetingData;
      console.log(this.meetingData);

    }).catch(error => {
      console.log(error);
    })

  }

  getPastMeetings() {
    this.httpserviceProvider.getMethod('meetings/getMeetingforOneMonth').then(data => {
      this.pastmeetings = data;
      this.past = this.pastmeetings;
      console.log(this.pastmeetings);

    }).catch(error => {
      console.log(error);
    })
  }

  getFutureMeetings() {
    this.httpserviceProvider.getMethod('meetings/getMeetingforFuture').then(data => {
      this.futuremeetings = data;
      this.future = this.futuremeetings;
      console.log(this.futuremeetings);

    }).catch(error => {
      console.log(error);
    })
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getTodaysMeetings();
    this.getPastMeetings();
    this.getFutureMeetings();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  newMeeting() {
    this.navCtrl.push(NewmeetingPage);
  }
  initializeItems() {
    this.today = this.meetingData;
    this.past = this.pastmeetings;
    this.future = this.futuremeetings;
  }
}
