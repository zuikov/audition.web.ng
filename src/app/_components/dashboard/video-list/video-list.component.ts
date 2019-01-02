import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../../_services';
import {InvoicesInterface} from '../../../_models/Invoices.model';
import {MatDialog} from '@angular/material/dialog';
import {GoogleAnalyticsEventsService} from '../../../_services/google-analytics-events.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  invoices: Array<InvoicesInterface> = [];
  filteredInvoices: Array<InvoicesInterface> = [];
  filter = 'all'
  public playlist: any;
  constructor(
    public dialog: MatDialog,
    private dashboardService: DashboardService,
    public analytics: GoogleAnalyticsEventsService
  ) {
  }

  ngOnInit() {
    this.dashboardService.getPlayList().subscribe((result: any) => {
      this.playlist = result.Playlist;
      console.log('playlist', result);
    });
  }
}
