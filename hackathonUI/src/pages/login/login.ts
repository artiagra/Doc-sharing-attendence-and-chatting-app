import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import 'rxjs/add/operator/map'
// import { Md5 } from '../../../node_modules/ts-md5/dist/md5';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { ForgetPage } from '../forget/forget';
// import { LocalNotifications } from '@ionic-native/local-notifications';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Md5 } from '../../../node_modules/ts-md5/dist/md5';
// import { SpeechRecognition } from '@ionic-native/speech-recognition';
// import { ChangeDetectorRef } from '@angular/core';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  model: any = {};
  matches: String[];
  isRecording = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpserviceProvider: HttpserviceProvider,
    public toastCtrl: ToastController, public menu: MenuController,
    private push: Push, public platform: Platform,
    // private speechRecognition: SpeechRecognition
    // , private localNotifications: LocalNotifications
  ) {
    this.menu.enable(false);
    // console.log(localStorage.getItem("userData"));
    var auto = JSON.parse(localStorage.getItem("userData"));

    if (auto !== null) {
      if (auto.hasOwnProperty("id")) {
        this.model = auto;
        this.autoLogin(auto);
      }
    }

    // this.localNotifications.schedule({
    //   id: 1,
    //   text: 'Single ILocalNotification',
    //   data:" { secret: key }"
    // }); 

    this.registerUser();


  }





  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // speek() {
  //   // Check feature available
  //   this.speechRecognition.isRecognitionAvailable()
  //     .then((available: boolean) => console.log(available))

  //   // Start the recognition process
  //   this.speechRecognition.startListening(options)
  //     .subscribe(
  //     (matches: Array<string>) => console.log(matches),
  //     (onerror) => console.log('error:', onerror)
  //     )

  //   // Stop the recognition process (iOS only)
  //   this.speechRecognition.stopListening()

  //   // Get the list of supported languages
  //   this.speechRecognition.getSupportedLanguages()
  //     .then(
  //     (languages: Array<string>) => console.log(languages),
  //     (error) => console.log(error)
  //     )

  //   // Check permission
  //   this.speechRecognition.hasPermission()
  //     .then((hasPermission: boolean) => console.log(hasPermission))

  //   // Request permissions
  //   this.speechRecognition.requestPermission()
  //     .then(
  //     () => console.log('Granted'),
  //     () => console.log('Denied')
  //     )
  // }


  autoLogin(loginData) {
    console.log(loginData);
    var hashpass = Md5.hashStr(loginData.pass);
    this.httpserviceProvider.postMethod('employee/login', {
      "id": loginData.id,
      "password": hashpass
    }).then(data => {
      console.log(data);
      this.httpserviceProvider.setUserId(loginData.id);
      this.httpserviceProvider.setuserRole(data['entity']);
      if (data['response'] == "success") {
        this.navCtrl.setRoot(HomePage);
      }
      else {
        let toast = this.toastCtrl.create({
          message: data['response'],
          duration: 3000
        });
        toast.present();
      }
    }).catch(error => {
      console.log(error);
      let toast = this.toastCtrl.create({
        message: error['response'],
        duration: 3000
      });
      toast.present();
    })
  }

  login(loginData) {

    localStorage.setItem("userData", JSON.stringify(this.model));
    // console.log(JSON.parse(localStorage.getItem("userData")));
    var hashpass = Md5.hashStr(loginData.pass);
    this.httpserviceProvider.postMethod('employee/login', {
      "id": loginData.id,
      "password": hashpass
    }).then(data => {
      console.log(data);
      this.httpserviceProvider.setUserId(loginData.id);
      this.httpserviceProvider.setuserRole(data['entity']);
      if (data['response'] == "success") {
        this.navCtrl.setRoot(HomePage);
      }
      else {
        let toast = this.toastCtrl.create({
          message: data['response'],
          duration: 3000
        });
        toast.present();
      }
    }).catch(error => {
      console.log(error);
      let toast = this.toastCtrl.create({
        message: error['response'],
        duration: 3000
      });
      toast.present();
    })


  }

  registerUser() {
    const options: PushOptions = {
      android: {
        senderID: '708464374472'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification);

    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration);
      var plat = this.platform.platforms();
      this.httpserviceProvider.postMethod('storedevice/' + this.model.id, {
        "deviceId": registration.registrationId,
        "platform": plat[2]
      }).then(data => {

      }).catch(error => {

      });

    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  register() {
    this.navCtrl.push(RegisterPage);

  }
  forget() {
    this.navCtrl.push(ForgetPage)
  }
}
