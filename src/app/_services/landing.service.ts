import { Injectable } from '@angular/core';
import {RequestService} from './request.service';

@Injectable()
export class LandingService {
    constructor(
        public requestService: RequestService
    ) {
    }

    getCurrenciesRates() {
      return this.requestService.get('/currencies/rates');
    }
    getFaq() {
    return this.requestService.get('/faq');
    }
    getReportsHistory() {
    return this.requestService.get('/reports/history');
    }
    getPlayList() {
    return this.requestService.get('/playlist');
    }
}
