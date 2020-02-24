import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule} from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { DetailsPage } from '../pages/details/details';
import { DepartmentPage } from '../pages/department/department';
import { DirectoryPage } from '../pages/directory/directory';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { NewmeetingPage } from '../pages/newmeeting/newmeeting';
import { ForgetPage } from '../pages/forget/forget';
import { ContactdetailPage } from '../pages/contactdetail/contactdetail'
import { AddminutesPage } from '../pages/addminutes/addminutes';
import { ChatPage } from '../pages/chat/chat';

import { QRScanner } from '@ionic-native/qr-scanner';

import { SpeechRecognition } from '@ionic-native/speech-recognition';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpserviceProvider } from '../providers/httpservice/httpservice';
import { Push } from '@ionic-native/push';


//import { Calender} from '@ionic-native/calender';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    DetailsPage,
    DepartmentPage,
    DirectoryPage,
    LoginPage,
    RegisterPage,
    NewmeetingPage,
    ForgetPage,
    ContactdetailPage,
    AddminutesPage,
    ChatPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    DetailsPage,
    DepartmentPage,
    DirectoryPage,
    LoginPage,
    RegisterPage,
    NewmeetingPage,
    ForgetPage,
    ContactdetailPage,
    AddminutesPage,
    ChatPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpserviceProvider,
    Push,
    QRScanner,
    SpeechRecognition
  ]
})
export class AppModule {}
