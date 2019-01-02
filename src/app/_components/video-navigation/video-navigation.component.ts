import { Component, Input, OnInit } from '@angular/core';
import { DashboardService, TokenService } from '../../_services';
import { Router } from '@angular/router';
import { GoogleAnalyticsEventsService } from '../../_services/google-analytics-events.service';

@Component({
  selector: 'app-video-navigation',
  templateUrl: './video-navigation.component.html',
  styleUrls: ['./video-navigation.component.scss']
})
export class VideoNavigationComponent implements OnInit {
  @Input() typeNavigation: string;
  constructor(
    public tokenService: TokenService,
    public dashboardService: DashboardService,
    public router: Router,
    public analytics: GoogleAnalyticsEventsService
  ) {
  }
  public ngOnInit(): void {
  }
}
