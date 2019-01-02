import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalRegistrationComponent } from '../modal-registration/modal-registration.component';
import { ModalAuthorizationComponent } from '../modal-authorization/modal-authorization.component';
import { DashboardService, LandingService, TokenService } from '../../_services';
import { NavigationEnd, Router } from '@angular/router';
import { RequestService } from '../../_services/request.service';
import { AuthenticationService } from '../../_services';
import { GoogleAnalyticsEventsService } from '../../_services/google-analytics-events.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @ViewChild('formInvoice') formInvoice: ElementRef;
  @ViewChild('intermediate') intermediate: ElementRef;
  @ViewChild('advanced') advanced: ElementRef;
  @ViewChild('fluent') fluent: ElementRef;
  @ViewChild('terms') terms: ElementRef;

  public links: any;
  public isLoggedIn = false;
  public mobilSignInMenuOpen: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    public tokenService: TokenService,
    public dashboardService: DashboardService,
    public router: Router,
    public requestService: RequestService,
    public analytics: GoogleAnalyticsEventsService,
    public sanitizer: DomSanitizer
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.analytics.emitEvent('Landing', 'Open', 'Main page open');
      }
    });
    this.authenticationService.isLoggedIn.subscribe( event => {
      this.isLoggedIn = event;
    });
  }

  public ngOnInit(): void {
      if (this.tokenService.getCurrentUserId()) {
        this.isLoggedIn = true;
      }
      this.requestService.get('/playlist')
      .subscribe(result => {
        const linksObject = result;
        this.links = linksObject['Playlist'];
      },
        error => {
          console.log('create cause error', error);
      });
  }

  public openDialogRegister(): void {
    this.analytics.emitEvent('Landing | Header', 'Click to sign up', 'Registration form');
    this.dialog.open(ModalRegistrationComponent, {
      panelClass: ['modal', 'modal_auth', 'modal_registration']

    }).afterClosed().subscribe(result => {

    });
  }
  public openDialogAuth(): void {
    this.analytics.emitEvent('Landing | Header', 'Click to sign in', 'Sign in form');
    this.dialog.open(ModalAuthorizationComponent, {
      panelClass: ['modal', 'modal_auth']

    }).afterClosed().subscribe(result => {

    });
  }

  public headerLogoClicked () {
    this.analytics.emitEvent('Landing | Header', 'Click', 'Main page');
  }

  public headerMenuClicked(value) {
    this.analytics.emitEvent('Landing | Header', 'Click', value);
    switch (value) {
      case 'intermediate':
        this.intermediate.nativeElement.scrollIntoView({
          behavior: 'smooth'
        });
        break;
      case 'advanced':
        this.advanced.nativeElement.scrollIntoView({
          behavior: 'smooth'
        });
        break;
      case 'fluent':
        this.fluent.nativeElement.scrollIntoView({
          behavior: 'smooth'
        });
        break;
      case 'terms':
        this.terms.nativeElement.scrollIntoView({
          behavior: 'smooth'
        });
        break;
    }
  }

  logOut() {
    this.authenticationService.logout();
    this.tokenService.clear();
  }

  public footerMenuClicked (value) {
    this.analytics.emitEvent('Landing | Footer', 'Click', value);
  }

}
