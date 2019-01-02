import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {TokenService} from '../../_services/token.service';
import {NavigationEnd, Router} from '@angular/router';
import { DataService } from '../../_services/data-service.service';
import {RequestService} from '../../_services/request.service';
import {GoogleAnalyticsEventsService} from '../../_services/google-analytics-events.service';
import { UserService } from '../../_services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})



export class HeaderComponent implements OnInit {
  public profileInformation: any;
  public getProfileInformation: any;
  place: string;
  constructor(private profileData: DataService,
              private userService: UserService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private tokenService: TokenService,
              private requestService: RequestService,
              public analytics: GoogleAnalyticsEventsService
  ) { }

  ngOnInit() {
    // this.getProfileInfo();
    // this.profileData.getUserInfo()
    //   .subscribe((currentUserInfo: any) => {
    //     this.profileInformation = currentUserInfo;
    //   });
    this.getLocationPlace(window.location.pathname);
  }
  getLocationPlace(url) {
    const place = url.replace('/', '').split('');

    place[0] = place[0].toUpperCase();
    this.place = place.join('');
  }
  getProfileInfo() {
    this.userService.getProfileInfo().subscribe((currentUserInfo: any) => {
      this.profileInformation = currentUserInfo;
      this.profileData.passUserInfo(currentUserInfo);
    });
  }
  logOut() {
    this.analytics.emitEvent(`${this.place} | Header`, 'Click', 'Logout');
    this.authenticationService.logout();
    this.tokenService.clear();
  }
}
