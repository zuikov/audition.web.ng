import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PasswordValidation } from './password-validation.validator';
import {AuthenticationService} from '../../_services/authentication.service';
import {TokenService} from '../../_services/token.service';
import { PASSWORD_VALIDATION, FIRST_AND_LAST_NAME_VALIDATION, MOBILE_VALIDATION } from '../../app.constants';

import { ModalAuthorizationComponent } from '../modal-authorization/modal-authorization.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GoogleAnalyticsEventsService} from '../../_services/google-analytics-events.service';

@Component({
  selector: 'app-modal-registration',
  templateUrl: './modal-registration.component.html',
  styleUrls: ['./modal-registration.component.scss']
})
export class ModalRegistrationComponent implements OnInit {
  public registerForm: FormGroup;
  public verifyEmail: boolean;
  public verifyMobile: boolean;
  public verified: boolean;
  public codeSend: boolean;
  public error: string;
  public verifiedArr: any[] = [];

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<ModalRegistrationComponent>,
              private router: Router,
              private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private tokenService: TokenService,
              public analytics: GoogleAnalyticsEventsService
  ) { }

  public ngOnInit(): void {
    this.analytics.emitEvent('Registration pop up', 'Open', 'Registration form open');
    // this.registerForm = this.fb.group({
    //   firstName: new FormControl('', [Validators.required, Validators.pattern(FIRST_AND_LAST_NAME_VALIDATION), Validators.maxLength(250)]),
    //   lastName: new FormControl('', [Validators.required, Validators.pattern(FIRST_AND_LAST_NAME_VALIDATION), Validators.maxLength(250)]),
    //   email: new FormControl( '', [Validators.email]),
    //   mobile: new FormControl( '', [Validators.pattern(MOBILE_VALIDATION), Validators.maxLength(250)]),
    //   emailCode: new FormControl( ''),
    //   mobileCode: new FormControl( ''),
    //   password: new FormControl( '', [Validators.required, Validators.minLength(6), Validators.pattern(PASSWORD_VALIDATION)]),
    //   passwordRepeat: new FormControl('', [Validators.required, Validators.minLength(6)])
    // }, {
    //   validator: PasswordValidation.MatchPassword
    // });
    this.registerForm = this.fb.group({
      username: new FormControl(''),
      email: new FormControl( ''),
      password: new FormControl( '', [Validators.required, Validators.minLength(6), Validators.pattern(PASSWORD_VALIDATION)]),
      passwordRepeat: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }
  public submitRegisterInfo(account): void {
    this.codeSend = true;
    if (this.registerForm.value.email !== '') {
      this.verifyEmail = true;
    }
    if (this.registerForm.value.mobile !== '') {
      this.verifyMobile = true;
    }
    this.authenticationService.register(account).subscribe((response) => {
      // console.log('response', response);
    }, err => {
      console.log('submitRegisterInfo', err);
    });
  }

  // public accountConfirm(type, code): void {
  //   this.analytics.emitEvent('Registration pop up', 'Click', `Verify ${type}`);
  //   this.authenticationService.verifyAccount(type, code).subscribe((response) => {
  //     this.verified = true;
  //     this.verifiedArr.push(type);
  //     console.log(this.verifiedArr);
  //   }, err => {
  //     console.log(err);
  //     this.error = err.error.message;
  //     console.log('accountConfirm error', this.error);
  //   });
  // }

  public redirect(): void {
    this.router.navigate(['dashboard']);
  }
  // public login(data): void {
  //   this.authenticationService.login(data)
  //     .subscribe(
  //       (result: any) => {
  //         this.analytics.emitEvent('Registration pop up', 'Registration success', 'Registration');
  //         const token = {
  //           id: result.token,
  //           created: new Date(),
  //           rememberMe: true,
  //           userId: result.existingUser._id
  //         };
  //         this.tokenService.setToken(token);
  //         this.dialogRef.close();
  //         this.redirect();
  //       },
  //       error => {
  //         this.analytics.emitEvent('Registration pop up', 'Fail', 'Registration');
  //         console.log('login error registration', error);
  //         console.log(data);
  //       });
  // }

  public login(data): void {
    this.authenticationService.login(data)
      .subscribe(
        (res: any) => {
          // this.analytics.emitEvent('Authentication pop up', 'Sign in success', 'Sign in');
          // const token = {
          //   id: result.token,
          //   created: new Date(),
          //   rememberMe: true,
          //   userId: result.existingUser._id,
          //   user: result.existingUser.username
          // };
          // this.tokenService.setToken(token);
          // this.dialogRef.close();
          // if (token.user === 'admin') {
          //   this.redirect();
          // }
          // console.log('token', token);
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          this.authenticationService.verifyAdmin();
        },
        error => {
          // this.analytics.emitEvent('Authentication pop up', 'Fail', 'Sign in');
          console.log('login error: ', error);
        });
  }


  public openDialogAuth(): void {
    this.analytics.emitEvent('Registration pop up', 'Click to sign in', 'Sign in form');
    this.dialogRef.close();
    this.dialog.open(ModalAuthorizationComponent, {
      panelClass: ['modal', 'modal_auth', 'modal_registration']
    }).afterClosed().subscribe(result => {
    });
  }
  public close() {
    this.analytics.emitEvent('Registration pop up', 'Click', 'Close');
    this.dialogRef.close();
  }
  showPhone() {
    if (this.verifyEmail && this.registerForm.value.mobile === '') {
      return true;
    }
  }
  showEmail() {
    if (this.verifyMobile && this.registerForm.value.email === '') {
      return true;
    }
  }
  // isValidated() {
  //   if (this.verifyEmail && !this.verifyMobile && this.verifiedArr.length) {
  //     return true;
  //   }
  //   if (this.verifyMobile && !this.verifyEmail && this.verifiedArr.length) {
  //     return true;
  //   }
  //   if (this.verifyEmail && this.verifyMobile && this.verifiedArr.length > 1) {
  //     return true;
  //   }
  // }
  isValidated() {
    if (this.verifyEmail) {
      return true;
    }
  }
}
