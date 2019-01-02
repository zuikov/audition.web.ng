import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient, HttpResponse} from '@angular/common/http';
import { AppSettings } from '../app.settings';
import {RequestService} from './request.service';

@Injectable()
export class UserService {
  public API_URL = AppSettings.API_ENDPOINT;

  constructor(
    public http: HttpClient,
    public requestService: RequestService
  ) {
  }

  public getProfileInfo() {
    return this.requestService.get('/users/profile', true);
  }
  public putProfileInfo(userProfile) {
    return this.requestService.put('/users/profile', userProfile, true);
  }
}
