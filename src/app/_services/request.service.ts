import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient, HttpResponse} from '@angular/common/http';
import { AppSettings } from '../app.settings';
import {TokenService} from './token.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class RequestService {

  constructor(
    public http: HttpClient,
    public tokenService: TokenService,
  ) {}

  post(url: string, data: any, auth?: boolean) {
    console.log('request service post method starts! ', 'url: ', url, 'data: ', data);
    console.log('AppSettings.API_ENDPOINT + url ', AppSettings.API_ENDPOINT + url);
    return this.http.post(AppSettings.API_ENDPOINT + url, data, this.getHeaders(auth));
  }

  get(url: string, auth?: boolean) {
    return this.http.get(AppSettings.API_ENDPOINT + url, this.getHeaders(auth));
  }

  put(url: string, data: any, auth?: boolean) {
    return this.http.put(AppSettings.API_ENDPOINT + url, data, this.getHeaders(auth));
  }

  deleteRequest(url: string, auth?: boolean) {
    return this.http.delete(AppSettings.API_ENDPOINT + url, this.getHeaders(auth));
  }

  patch(url: string, data: any, auth?: boolean) {
    return this.http.patch(AppSettings.API_ENDPOINT + url, data, this.getHeaders(auth));
  }

  private getHeaders(auth: boolean) {
    let headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    if (auth) {
      // const xAuthToken = this.tokenService.getToken().id;
      const token = localStorage.getItem('token');
      headers = new HttpHeaders({
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type':  'application/json',
        // 'Accept': 'application/json, text/plain, */*',

        // 'x-access-token': xAuthToken,
        'Authorization': token
      });
    }
    return { headers: headers };
  }
}
