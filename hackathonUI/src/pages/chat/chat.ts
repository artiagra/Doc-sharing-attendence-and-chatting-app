import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  matches: String[];
  isRecording = false;
  items: any = {};
  testRadioResult: any;
  chatText: any;
  testRadioOpen = true;
  meetingId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpserviceProvider: HttpserviceProvider,
    private cd: ChangeDetectorRef, private speechRecognition: SpeechRecognition, public alertCtrl: AlertController) {
    this.meetingId = this.httpserviceProvider.getmeetinngId();
    this.getPermission();
    this.items = ["Hi"];
  }
  addChat(text) {
    this.items.push(this.chatText);
    var id = this.httpserviceProvider.getUserId();

    this.httpserviceProvider.postMethod('meetingChat/', {
      "chatmeetingId": this.meetingId,
      "chatuserid": id,
      "chat": this.chatText
    }).then(data => {

    }).catch(error => {

    });
    this.chatText = "";

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }
  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }
  startListening() {
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.chatText = this.matches[0];

      this.cd.detectChanges();
    });
    this.isRecording = true;
  }
}
