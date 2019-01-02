import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {routing} from './app.routing';
import {MaterialsModule} from './_modules/materials.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthGuardService } from './_services/auth-guard.service';
import { UserService } from './_services/user.service';
import {
  RequestService,
  AuthenticationService,
  TokenService,
  StorageBrowser,
  CookieBrowser,
  BaseStorage,
  InternalStorage,
  Storage,
  LandingService,
  DashboardService
} from './_services';

import { AppComponent } from './app.component';
import {HomeComponent} from './_components/home/';
import {HeaderComponent} from './_components/header';
import {PageNotFoundComponent} from './_components/page-not-found/';
import {SettingsComponent} from './_components/settings/settings.component';
import { LandingComponent } from './_components/landing/landing.component';
import { ModalRegistrationComponent } from './_components/modal-registration/modal-registration.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {NavigationComponent} from './_components/navigation/';
import {DashboardComponent} from './_components/dashboard/';
import {AuditorComponent} from './_components/auditor/';
import {VideoListComponent} from './_components/dashboard/video-list';
import {UserListComponent} from './_components/dashboard/user-list';
import {ModalAuthorizationComponent} from './_components/modal-authorization/modal-authorization.component';
import { FooterComponent } from './_components/footer/footer.component';
import { VideoEditorComponent } from './_components/dashboard/video-editor/video-editor.component';
import { DatePipe } from '@angular/common';
import {GoogleAnalyticsEventsService} from './_services/google-analytics-events.service';
import { AccountBlockedComponent } from './_components/emails/account-blocked/account-blocked.component';
import { VideoLibrary } from './_components/video-library/video-library.component';
import { FilterPipe } from './pipes/filter.pipe';
import { HighlightSearch } from './pipes/highlight-search.pipe';
import { BreakLinePipe } from './pipes/break-line.pipe';
import { VideoNavigationComponent } from './_components/video-navigation/video-navigation.component';
import { VideoNavBarComponent } from './_components/video-navigation/video-nav-bar/video-nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LandingComponent,
    SettingsComponent,
    ModalRegistrationComponent,
    FooterComponent,
    NavigationComponent,
    DashboardComponent,
    AuditorComponent,
    VideoListComponent,
    UserListComponent,
    ModalAuthorizationComponent,
    NavigationComponent,
    VideoEditorComponent,
    AccountBlockedComponent,
    VideoLibrary,
    FilterPipe,
    HighlightSearch,
    BreakLinePipe,
    VideoNavigationComponent,
    VideoNavBarComponent
  ],
  entryComponents: [
    ModalRegistrationComponent,
    ModalAuthorizationComponent,
  ],
  imports: [
    BrowserModule,
    MaterialsModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthenticationService,
    UserService,
    RequestService,
    TokenService,
    StorageBrowser,
    CookieBrowser,
    BaseStorage,
    InternalStorage,
    Storage,
    LandingService,
    DashboardService,
    DatePipe,
    AuthGuardService,
    GoogleAnalyticsEventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
