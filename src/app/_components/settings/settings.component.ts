import { Component, OnInit, AfterViewInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DataService } from '../../_services/data-service.service';
import {GoogleAnalyticsEventsService} from '../../_services/google-analytics-events.service';
import { UserService } from '../../_services/user.service';
import { FIRST_AND_LAST_NAME_VALIDATION, MOBILE_VALIDATION } from '../../app.constants';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit , AfterViewInit {
  countryes = [
    'Albania',
    'Andorra',
    'Armenia',
    'Austria',
    'Azerbaijan',
    'Belarus',
    'Belgium',
    'Bosnia and Herzegovina',
    'Bulgaria',
    'Croatia',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Georgia',
    'Germany',
    'Greece',
    'Hungary',
    'Iceland',
    'Ireland',
    'Italy',
    'Kosovo',
    'Latvia',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macedonia',
    'Malta',
    'Moldova',
    'Monaco',
    'Montenegro',
    'The Netherlands',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'Russia',
    'San Marino',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Turkey',
    'Ukraine',
    'United Kingdom',
    'Vatican City',
  ];
  public profile: any;
  public settingsForm: FormGroup;
  public maxDate: any;

  constructor(
    private profileData: DataService,
    private userService: UserService,
    public datepipe: DatePipe,
    private router: Router,
    private fb: FormBuilder,
    public analytics: GoogleAnalyticsEventsService
  ) {
  }
  ngAfterViewInit() {
    // this.getProfileInfo();
  }
  maxDateCulculation() {
    const year = new Date().getFullYear() - 18;
    const moth = new Date().getMonth();
    const day = new Date().getDate();
    return this.maxDate = new Date(year, moth, day);
  }
  public ngOnInit(): void {
    this.settingsForm = this.fb.group({
      firstName: new FormControl('',
        [Validators.required, Validators.maxLength(250), Validators.pattern(FIRST_AND_LAST_NAME_VALIDATION)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(250), Validators.pattern(FIRST_AND_LAST_NAME_VALIDATION)]),
      email: new FormControl('', [Validators.email]),
      mobile: new FormControl('', [Validators.maxLength(250), Validators.pattern(MOBILE_VALIDATION)]),
      dateOfBirth: new FormControl('' ),
      citizenshipCountry: new FormControl(''),
      citizenshipCity:  new FormControl('', [Validators.maxLength(250), Validators.pattern(FIRST_AND_LAST_NAME_VALIDATION)]),
      occupation:  new FormControl('', [Validators.maxLength(250), Validators.pattern(FIRST_AND_LAST_NAME_VALIDATION)])
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.analytics.emitEvent('Settings', 'Open', 'Settings open');
      }
    });
  }
  getProfileInfo() {
    this.profileData.getUserInfo().subscribe(
      (response: any) => {
        this.profile = response;
            if (this.profile.mobile !== '') {
              this.settingsForm.controls.mobile.disable();
             }
            if (this.profile.email !== '') {
               this.settingsForm.controls.email.disable();
            }
      },
      error => {
        console.log('getProfileInfo error', error);
      });
  }
  public saveSettings(formData): void {
    console.log(formData);
    this.analytics.emitEvent('Settings | Settings', 'Click', 'Save settings');
    this.userService.putProfileInfo(formData)
      .subscribe(
        (response: any) => {
          this.router.navigate(['dashboard']);
        },
        error => {
          console.log('saveSettings error', error);
        });
  }
  public setBithday(): void {
    console.log(this.settingsForm.value.dateOfBirth);
    return this.settingsForm.controls['dateOfBirth'].setValue(this.datepipe.transform(this.settingsForm.value.dateOfBirth, 'yyyy-MM-dd'));
  }
  public uploadPicture(): void {
    this.analytics.emitEvent('Settings | Settings', 'Click', 'Upload picture');
  }
  public changePassword(): void {
    this.analytics.emitEvent('Settings | Settings', 'Click', 'Change password');
  }
  public inputFocussed(value): void {
    this.analytics.emitEvent('Settings | Settings', 'Click', value);
  }
}
