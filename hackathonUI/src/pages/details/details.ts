import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { ChatPage } from '../../pages/chat/chat';
import { templateJitUrl } from '@angular/compiler';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',

})
export class DetailsPage {
  selectedItem: any;
  userRole: any;
  checked = true;
  constructor(public navCtrl: NavController, private httpserviceProvider: HttpserviceProvider,
    public navParams: NavParams, public toastCtrl: ToastController,
    private qrScanner: QRScanner) {
    this.selectedItem = navParams.get('item');
    console.log(this.selectedItem);
    this.httpserviceProvider.setmeetinngId(this.selectedItem.id);
    this.userRole = this.httpserviceProvider.getuerRole();
    if (this.selectedItem.updates) {
      this.checked = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }


  joinConference(){
    this.navCtrl.push(ChatPage);
  }

  scan() {
    
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            window.document.querySelector('ion-app').classList.remove('transparent-body');
            let toast = this.toastCtrl.create({
              message: "Cheked In with Meeting id: " + text,
              duration: 3000
            });
            toast.present();
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

          // show camera preview
          this.qrScanner.show();
          this.checked = false;
          window.document.querySelector('ion-app').classList.add('transparent-body');

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));


  }


}
