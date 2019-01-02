import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsEventsService } from '../../_services/google-analytics-events.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
  constructor(
    public analytics: GoogleAnalyticsEventsService
  ) { }

  ngOnInit() {
  }

  public openDashboard(value) {
    this.analytics.emitEvent('Dashboard | Left menu', 'Click to go Dashboard', `${value}`);
  }
  public openSettings(value) {
    this.analytics.emitEvent('Dashboard | Left menu', 'Click to go Settings', `${value}`);
  }
}
