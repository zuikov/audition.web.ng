import {AfterContentInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {DashboardService, LandingService} from '../../_services';
import { ModalAuthorizationComponent } from '../modal-authorization/modal-authorization.component';
import {MatDialog} from '@angular/material/dialog';
import {GoogleAnalyticsEventsService} from '../../_services/google-analytics-events.service';
import {RequestService} from '../../_services/request.service';

@Component({
  selector: 'auditor-widget',
  templateUrl: './auditor.component.html',
  styleUrls: ['./auditor.component.scss']
})

export class AuditorComponent implements OnInit, OnDestroy, AfterContentInit {
  public changeValue: number = null;
  public note: string = '';
  public interval: any;
  public changeValueError = false;
  public listObject: Object;

  @ViewChild('changeValueInput') changeValueInput: ElementRef;
  @ViewChild('getValueInput') getValueInput: ElementRef;

  @Input() hideChangesValues = false;
  @Input() isFromFooter = false;
  @Output() payEntered = new EventEmitter<any>();
  @Output() getEntered = new EventEmitter<any>();
  @Output() exchangeInfoClicked = new EventEmitter<any>();
  constructor (
    public dialog: MatDialog,
    public landingService: LandingService,
    public dashboardService: DashboardService,
    public analytics: GoogleAnalyticsEventsService,
    public requestService: RequestService
  ) {

  }
  public ngOnInit(): void {

  }
  public ngOnDestroy() {
    clearInterval(this.interval);
  }

  public ngAfterContentInit() {
    setTimeout(() => {
      // this.changeValueInput.nativeElement.onmousewheel = this.preventMouseEvents.bind(this);
      // this.changeValueInput.nativeElement.onkeydown = this.preventELetterEnter.bind(this);
      // this.getValueInput.nativeElement.onmousewheel = this.preventMouseEvents.bind(this);
      // this.getValueInput.nativeElement.onkeydown = this.preventELetterEnter.bind(this);
    });
  }

  public preventNotANumberInput (event) {
    if (/[^0-9]+/.test(event.key) && event.key !== 'Backspace') {
      return false;
    }
  }
  public setChangeValue(value) {
    this.changeValue = value;
  }
  private preventMouseEvents(event) {
    event.preventDefault();
  }
  private preventELetterEnter(event) {
    if (event.keyCode === 69 || event.keyCode === 189 || event.keyCode === 187) {
      event.preventDefault();
    }
  }
  public saveNote() {
    const listObject = {
      title: this.changeValue,
      description: this.note
    };
    this.requestService.post('/playlist', listObject, true)
      .subscribe(result => {
        this.listObject = result;
      },
        error => {
          console.log('create listObject error', error);
        });
    console.log('listObject', listObject);
  }

}
