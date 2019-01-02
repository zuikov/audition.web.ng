import { Injectable } from '@angular/core';

import {RequestService} from './request.service';
import {Subject} from 'rxjs';

@Injectable()
export class DashboardService {
  private invoiceSubject = new Subject<any>();
  public rates: any;
  constructor(
    public requestService: RequestService,
  ) {}

  public getTransactions() {
    return this.requestService.get('/operations', true);
  }
  public getRates(from, to) {
    return this.requestService.get(`/currencies/${from}/${to}/rates`, true);
  }
  public getBalance() {
    return this.requestService.get('/wallets', true);
  }
 
  public addWithdrawal(withdrawal) {
    return this.requestService.post('/withdrawals', withdrawal);
  }
  public downloadInvoice(id) {
    return this.requestService.get(`/invoices/${id}/pdf`, true);
  }
  public updateInvoicesList() {
    this.invoiceSubject.next();
  }
  public getUpdatedInvoicesList() {
    return this.invoiceSubject.asObservable();
  }
  public setRates(rates) {
    return this.rates = rates;
  }
  public getSavedRates() {
    return this.rates;
  }

  public getAllUsers() {
    return this.requestService.get('/user');
  }

  public getPlayList() {
    return this.requestService.get('/playlist');
  }

}

