import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { DepartmentPage } from '../pages/department/department';
import { DirectoryPage } from '../pages/directory/directory';
import { LoginPage } from '../pages/login/login';



import 'rxjs/add/operator/map'
import { HttpserviceProvider } from '../providers/httpservice/httpservice';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage; 

  pages: Array<{ title: string, component: any }>;
  userid: any;
  userdata: any;
  firstname = "";
  email = "";

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private httpserviceProvider: HttpserviceProvider, public events: Events, ) {
    this.initializeApp();

    events.subscribe('user:login', () => {
      this.setuser();
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: AboutPage },
      { title: 'Meetings', component: HomePage },
      { title: 'Department', component: DepartmentPage },
      { title: 'Directory', component: DirectoryPage }
    ];


  }
  

  setuser() {
    this.userid = this.httpserviceProvider.getUserId();

    this.httpserviceProvider.getMethod('employee/getEmployeeById/' + this.userid).then(data => {
      this.userdata = data;
      this.firstname = this.userdata.firstname;
      this.email = this.userdata.email;
      console.log(this.userdata);
      this.httpserviceProvider.setdid(this.userdata.department);
    }).catch(error => {
      console.log(error);
    })
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot(LoginPage);
    localStorage.removeItem("userData");
  }

}
