import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DashboardService} from '../../../_services';
import {AuthenticationService} from '../../../_services/';
import {GoogleAnalyticsEventsService} from '../../../_services/google-analytics-events.service';
import {RequestService} from '../../../_services/request.service';
import {ListObject, ListObjectInterface} from '../../../_models/ListObject.model';

declare let Chart: any;

@Component({
  selector: 'app-video-editor',
  templateUrl: './video-editor.component.html',
  styleUrls: ['./video-editor.component.scss']
})
export class VideoEditorComponent implements OnInit {
  public sectionNumber: number = null;
  public sectionName: string = '';
  public title: string = '';
  public description: string = '' ;
  public link: string = '' ;
  public listObject: ListObjectInterface = new ListObject();

  chart: any;
  filter = 'day';
  range: any;
  rates: any;
  withdrawData: any;
  balance: any;
  constructor(
    public dialog: MatDialog,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    public analytics: GoogleAnalyticsEventsService,
    public requestService: RequestService
  ) {
  }

  ngOnInit(): void {

  }

  getBalance() {
    this.dashboardService.getBalance()
      .subscribe(balance => {
        this.balance = balance[0];
        this.balance.amountSlitted = this.balance.amount.toString().split('.');
      });
  }

  public setFitler (value) {
    this.filter = value;
    let toRange = null;
    switch (value) {
      case 'day': {
        toRange = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0);
        break;
      }
      case 'week': {
        toRange = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 7).setHours(0, 0, 0, 0);
        break;
      }
      case 'month': {
        toRange = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 31).setHours(0, 0, 0, 0);
        break;
      }
    }
    this.range = {
      from: new Date(new Date().setHours(0, 0, 0, 0)),
      to: new Date(toRange)
    };
    this.buildChart(this.rates);
  }


  private addZero(val) {
    return val >= 10 ? val : '0' + val;
  }

  private parseDate(date: string): string {
    return `${new Date(date).getFullYear()}-${this.addZero(new Date(date).getMonth() + 1)}-${this.addZero(new Date(date).getDate())}`;
  }

  private getDates(dataSet: any): Array<string> {
    const arr = [];

    dataSet.forEach(d => {
      if (arr.indexOf(this.parseDate(d.date)) === -1 && this.range.from > new Date(d.date) && this.range.to < new Date(d.date)) {
        arr.push(this.parseDate(d.date));
      }
    });
    arr.sort((a, b) => {
      if (new Date(a) < new Date(b)) {
        return -1;
      }
      if (new Date(a) > new Date(b)) {
        return 1;
      }
      return 0;
    });
    return arr;
  }

  private getIdsArray(dataSet: any): Array<number> {
    const arr = [];

    dataSet.forEach(d => {
      if (arr.indexOf(d.rate) === -1) {
        arr.push(d.rate);
      }
    });
    return arr;
  }

  private buildConfig(dataSet) {
    const idArray = this.getIdsArray(dataSet);
    const dates = this.getDates(dataSet);

    return {
      type: 'line',
      data: {
        datasets: [{
          label: '',
          borderColor: '#0294FF',
          data: idArray,
          spanGaps: true,
          backgroundColor: 'rgba(2, 148, 255, 0.1)',
          fill: true
        }],
        labels: dates,
      },
      options: {
        responsive: true,
        legend: false,
        maintainAspectRatio: false,
      },
    };
  }

  private buildChart(data) {
    let config = null;
    config = this.buildConfig(data);
    if (!this.chart) {
      const ctx = document.getElementById('rates') as HTMLCanvasElement;
      ctx.getContext('2d');
      this.chart = new Chart(ctx, config);
    } else {
      this.chart.config = config;
      this.chart.update();
    }
  }

  public addVideo() {
    const listObject = {
      sectionNumber: this.sectionNumber,
      sectionName: this.sectionName,
      title: this.title,
      description: this.description,
      link: this.link
    };
    this.requestService.post('/playlist', listObject, true)
      .subscribe(result => {
        // this.listObject = result;
        console.log('new ListObject', result);
      },
        error => {
          console.log('create listObject error', error);
        });
    console.log('listObject', listObject);
  }

  public preventNotANumberInput (event) {
    if (/[^0-9]+/.test(event.key) && event.key !== 'Backspace') {
      return false;
    }
  }
}
