import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the HttpserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpserviceProvider {

  apiUrl = "http://192.168.43.29:8080/";
  userid: any;
  userRole: any;
  meeting: any;
  did: any;
  constructor(public http: Http, public loadingCtrl: LoadingController) {
    console.log('Hello HttpserviceProvider Provider');
  }

  postMethod(url, body) {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.post(this.apiUrl + url, JSON.stringify(body), options)
        // this.http.post(this.apiUrl + url, body, options)
        .subscribe((res: Response) => {
          console.log('res', res);
          resolve(res.json());
          loader.dismiss();
        }, (err) => {
          console.log(err);
          reject(err.json());
          loader.dismiss();
        });
    });
  }

  putMethod(url, body) {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.put(this.apiUrl + url, JSON.stringify(body), options)
        // this.http.post(this.apiUrl + url, body, options)
        .subscribe((res: Response) => {
          console.log('res', res);
          resolve(res.json());
          loader.dismiss();
        }, (err) => {
          console.log(err);
          reject(err.json());
          loader.dismiss();
        });
    });
  }

  getMethod(url) {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.get(this.apiUrl + url, options)
        // this.http.post(this.apiUrl + url, body, options)
        .subscribe((res: Response) => {
          console.log('res', res);
          resolve(res.json());
          loader.dismiss();
        }, (err) => {
          console.log(err);
          reject(err.json());
          loader.dismiss();
        });
    });
  }

  deleteMethod(url) {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.delete(this.apiUrl + url, options)
        // this.http.post(this.apiUrl + url, body, options)
        .subscribe((res: Response) => {
          console.log('res', res);
          resolve(res.json());
          loader.dismiss();
        }, (err) => {
          console.log(err);
          reject(err.json());
          loader.dismiss();
        });
    });
  }

  setUserId(Id) {
    this.userid = Id;
  }

  getUserId() {
    return this.userid;
  }

  setmeetinngId(Id) {
    this.meeting = Id;
  }

  getmeetinngId() {
    return this.meeting;
  }

  setuserRole(role) {
    this.userRole = role;
  }

  getuerRole() {
    return this.userRole;
  }

  setdid(id){
    this.did = id;
  }

  getdid(){
    return this.did;
  }

}
