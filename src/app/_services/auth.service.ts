import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  API_URL = AppSettings.API_ENDPOINT;
  constructor(private http: HttpClient) {
  }
  public singUp(account: any): Observable<any> {
    return this.http.post(this.API_URL + '/users/profile', account);
  }
  public emailConfirm(login: any, code: any): Observable<any> {
    return this.http.post(this.API_URL + '/users/profile/' + login + '/confirm', code);
  }

}
