import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {RequestService} from './request.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  public isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isAdminLoggedIn = false;
    constructor(
        public router: Router,
        public requestService: RequestService,
    ) {}

    login(data) {
        return this.requestService.post('/user/login', data);
    }

    checkAccess(data) {
      return this.requestService.post('/admin/auth', data, true);
    }

    isAdmin(data) {
      return this.requestService.post('/admin/auth', data, true);
    }

    isAuthenticated(data) {
      this.checkAccess(null)
      .subscribe(
        (result: any) => {
          console.log('this.message1', result.message);
          if (result.message === 'Admin have authorized successfully') {
            return true;
          } else {
            this.router.navigate(['']);
            return false;
          }
        },
        error => {
          console.log('checkAccess error', error);
          return false;
        });
    }

    verifyAdmin() {
      const data = {};
      this.isAdmin(data)
        .subscribe(
          (res: any) => {
            if (res && res.message === 'admin status confirmed') {
              console.log('admin authorized successfully!');
              this.router.navigate(['dashboard']);
            } else {
              console.log('admin authorization failed');
            }
          }
        );
    }

    checkPassword(data) {
      return this.requestService.put('/users/profile/password/verify', data, true);
    }
    register(account: any) {
      // return this.requestService.post('/users/profile', account);
      return this.requestService.post('/user/signup', account);
    }

    createPassword(data: any) {
        return this.requestService.put('account/user', data);
    }

    reset(email: string) {
        return this.requestService.put('account/password', JSON.stringify(email));
    }

    setToken(data: any) {

    }

    verifyAccount(login: any, code: any) {
      return this.requestService.post('/users/profile/' + login + '/confirm', code);
    }

    logout() {
      this.isLoggedIn.emit(false);
        this.router.navigate(['']);
    }
}
