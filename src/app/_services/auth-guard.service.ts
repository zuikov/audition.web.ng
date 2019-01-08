import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {TokenService} from './index';
import { Observable } from 'rxjs';

// import { map } from 'rxjs/operators';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/do';


@Injectable()

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


