import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userInfo = new Subject<any>();
  private faqTitles = new Subject<any>();
  constructor() {
  }
  passUserInfo(userInfo: any) {
    this.userInfo.next(userInfo);
  }
  getUserInfo(): Observable<any> {
    return this.userInfo.asObservable();
  }
  passFaqTitles(faqTitlesArray: any) {
    console.log('data service', faqTitlesArray);
  this.faqTitles.next(faqTitlesArray);
  }
  getFaqTitles(): Observable<any> {
  return this.faqTitles.asObservable();
}
}
