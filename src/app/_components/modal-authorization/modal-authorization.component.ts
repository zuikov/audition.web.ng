import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {AuthenticationService} from '../../_services';
import {TokenService} from '../../_services';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ModalRegistrationComponent } from '../modal-registration/modal-registration.component';
import {GoogleAnalyticsEventsService} from '../../_services/google-analytics-events.service';
import { PASSWORD_VALIDATION} from '../../app.constants';


@Component({
  selector: 'app-modal-authorization',
  templateUrl: './modal-authorization.component.html',
  styleUrls: ['./modal-authorization.component.scss']
})
export class ModalAuthorizationComponent implements OnInit {
  public authorizationForm: FormGroup;
  public error: boolean;


  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<ModalAuthorizationComponent>,
              private router: Router,
              private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private tokenService: TokenService,
              public analytics: GoogleAnalyticsEventsService
  ) {
  }

  public ngOnInit(): void {
    this.authorizationForm = this.fb.group({
      username: new FormControl(''),
      email: new FormControl(''),
      // login: new FormControl('', [Validators.required]),
      // password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(PASSWORD_VALIDATION)])
      password: new FormControl('')
    });
  }

  public login(data): void {
    this.authenticationService.login(data)
      .subscribe(
        (res: any) => {
          console.log('result from modal authorization component', res);
          // const token = {
          //   id: result.token,
          //   created: new Date(),
          //   rememberMe: true,
          //   userId: result.existingUser._id,
          //   user: result.existingUser.username
          // };
          // this.tokenService.setToken(token);

          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);

          this.authenticationService.isLoggedIn.emit(true);
          this.dialogRef.close();
          // if (token.user === 'admin') {
          //   console.log('token.user', token.user);
          //   this.redirect();
          // }
          // console.log('token', token);

         
          this.authenticationService.verifyAdmin();
            // .subscribe(
            //   (res: any) => {
            //     if (res && res.message === 'admin status confirmed') {
            //       this.redirect();
            //       console.log('admin authorized successfully!');
            //     } else {
            //       console.log('admin authorization failed');
            //     }
            //   },
            //   error => {
            //     console.log('error of admin verification ', error);
            //   }
            // )
        },
        error => {
          this.analytics.emitEvent('Authentication pop up', 'Fail', 'Sign in');
          this.error = true;
          console.log('login error authorization', error);
        });
  }

  public redirect(): void {
    this.router.navigate(['dashboard']);
  }

  public openDialogRegister(): void {
    this.analytics.emitEvent('Authentication pop up', 'Click', 'Registration form');

    this.dialogRef.close();
    this.dialog.open(ModalRegistrationComponent, {
      panelClass: ['modal', 'modal_auth']
    }).afterClosed().subscribe(result => {
    });
  }

  public close() {
    this.dialogRef.close();
  }
}
