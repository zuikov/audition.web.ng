import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../_services';
import {GoogleAnalyticsEventsService} from '../../_services/google-analytics-events.service';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    public analytics: GoogleAnalyticsEventsService,
    public dialog: MatDialog,

  ) {
  }

  ngOnInit() {
  }

  public openTermsOfService(value) {
    this.analytics.emitEvent('Dashboard | Left menu', 'Click', `${value}`);
  }

  public openPrivacyPolicy(value) {
    this.analytics.emitEvent('Dashboard | Left menu', 'Click', `${value}`);
  }
}
