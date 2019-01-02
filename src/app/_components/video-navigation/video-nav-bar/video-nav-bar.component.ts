import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../_services/data-service.service';
@Component({
  selector: 'app-video-nav-bar',
  templateUrl: './video-nav-bar.component.html',
  styleUrls: ['./video-nav-bar.component.scss']
})
export class VideoNavBarComponent implements OnInit {
  public uniqueTitles: Array<any> = [];
  constructor(
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.getFaqTitles();
  }
  public getFaqTitles() {
    this.dataService.getFaqTitles().subscribe((response) => {
      this.uniqueTitles = response;
      console.log('faq massage response',  response);
    }, (error) => {
      console.log('faq massage error', error);
    });
  }
}
