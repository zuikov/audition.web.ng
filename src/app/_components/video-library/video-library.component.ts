import { Component, ElementRef, EventEmitter,
  OnInit, Output, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { DashboardService, TokenService} from '../../_services';
import { DataService } from '../../_services/data-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAnalyticsEventsService } from '../../_services/google-analytics-events.service';
import { UserService } from '../../_services/user.service';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import {AuthenticationService} from '../../_services';
@Component({
  selector: 'video-library',
  templateUrl: './video-library.component.html',
  styleUrls: ['./video-library.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoLibrary implements OnInit {
  isOpenedLeftSidebar = false;
  @Output() isToggledLeftSidebar = new EventEmitter<boolean>();
  @ViewChild('faqContainer') faqContainerRef: ElementRef;

  public elementId: any = '';
  public questionArray: any;
  public searchText = '';
  public result = null;
  public questionsArraySort: Array<any> = [];
  public queryParam: string;
  public isLoggedIn = false;

  constructor(
    @Inject(DOCUMENT) document,
    public tokenService: TokenService,
    public router: Router,
    public analytics: GoogleAnalyticsEventsService,
    private userService: UserService,
    public dataService: DataService,
    // private landingService: LandingService,
    private dashboardService: DashboardService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.isLoggedIn.subscribe( event => {
      this.isLoggedIn = event;
    });
  }

  public ngOnInit(): void {
    if (this.tokenService.getCurrentUserId()) {
      this.isLoggedIn = true;
    }
    this.getFaqArray();
    this.route.queryParams.subscribe((params) => {
      this.queryParam = params.section;
      this.searchText = '';
     // setTimeout(() => { this.scrollTo(params.section); }, 100);
    });
  }

  public countResults(): void {
    // this.router.navigate(['/faq']);
    this.result = this.faqContainerRef.nativeElement.querySelectorAll('.faq__item').length;
  }

  public getFaqArray(): void {
    this.dashboardService.getPlayList().subscribe((result: any) => {
      this.cd.markForCheck();
      const uniqueTitles = Array.from(new Set(result.map((item: any) => item.sectionName)));
      this.dataService.passFaqTitles(uniqueTitles);
      for (let i = 0; i < uniqueTitles.length; i++) {
        this.questionsArraySort.push({
          'title': uniqueTitles[i],
          'qaGroup': []
        });
        for (let k = 0; k < result.length; k++) {
          if (result[k].sectionName === uniqueTitles[i]) {
            this.questionsArraySort[i].qaGroup.push(result[k]);
            console.log('this.questionsArraySort', this.questionsArraySort);
          }
        }
      }
    }, error => {
      console.log('faq error', error);
    });
  }

  /*мобильное меню*/
  public mobMenuToggle(): void {
    this.isOpenedLeftSidebar = !this.isOpenedLeftSidebar;
  }

  public onOpeningLeftSidebar(action: boolean) {
    // console.log('getted and emitted', action);
    this.isOpenedLeftSidebar = action;
    this.isToggledLeftSidebar.emit(action);
    // console.log(this.isOpenedLeftSidebar);
  }

  public onClosingLeftSidebar(action: boolean) {
    // console.log('closing left bar', action);
    this.isOpenedLeftSidebar = action;
  }

  // scrollTo(id: string): void {
  //   const element = document.getElementById(id);
  //   element.scrollIntoView({behavior: 'smooth'});
  // }
}
