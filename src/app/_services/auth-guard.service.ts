import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {TokenService} from './index';
import { Observable } from 'rxjs';

// import { map } from 'rxjs/operators';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/do';


@Injectable()
// export class AuthGuardService implements CanActivate {
//   constructor(
//     public authenticationService: AuthenticationService,
//     public router: Router,
//     public tokenService: TokenService,
//   ) {}

  // canActivate(): boolean {  // Вариант для проверки обычного пользователя по наличию токена
  //   if (!this.tokenService.getCurrentUserId()) {
  //     this.router.navigate(['']);
  //     console.log('this.tokenService.getCurrentUserId()-false', this.tokenService.getCurrentUserId());
  //     return false;
  //   }
  //   console.log('this.tokenService.getCurrentUserId()-true', this.tokenService.getCurrentUserId());
  //   return true;
  // }

  // canActivate(): Observable<boolean> | boolean { // Вариант с Observable №1
  //   console.log('this.authenticationService.isAuthenticated() 1', this.authenticationService.isAuthenticated());
  //   if (this.authenticationService.isAuthenticated()) {
  //     return true;
  //   } else {
  //     console.log('this.authenticationService.isAuthenticated() 2', this.authenticationService.isAuthenticated());
  //     this.router.navigate(['']);
  //     return false;
  //   }
  // }
// }

// export class AuthGuardService implements CanActivate {

//   constructor(
//     public authenticationService: AuthenticationService,
//   ) {}

//   public canActivate(): Observable<boolean> {  // Вариант с Observable №2
//     // if (this.authenticationService.isAuthenticated()) {
//     //   return true;
//     // } else {
//       console.log('loading...');
//       return new Observable<boolean>((observer) => {
//           observer.next();
//           observer.complete();
//           console.log('done!');
//       });
//   }
// }

// export class AuthGuardService implements CanActivate { // Вариант с Observable №3
//   constructor(
//     public authenticationService: AuthenticationService,
//     public router: Router
//   ) {}
//   public canActivate(): Observable<boolean> {
//       console.log('loading...');
//       return new Observable(this.authenticationService.isAuthenticated);
//   }
// }

export class AuthGuardService implements CanActivate { // Вариант с Promise
  constructor(
    public authenticationService: AuthenticationService,
    public router: Router
  ) {}
  public canActivate(): Promise<boolean> {
    console.log('loading...');
    return new Promise((resolve) => {
      this.authenticationService.checkAccess(null).toPromise()
        .then((result) => {
          console.log('result', result);
          // this.router.navigate(['/dashboard']);
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
      });
  }
}


