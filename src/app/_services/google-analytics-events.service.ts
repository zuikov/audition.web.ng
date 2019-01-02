import {Inject, Injectable} from '@angular/core';

declare var ga: any;

@Injectable()
export class GoogleAnalyticsEventsService {

  constructor(
  ) {}

  public emitEvent(eventCategory: string, eventAction: string, eventLabel: string = null, eventValue: number = null) {
    if (typeof ga !== 'undefined') {
      ga('send', 'event', {
        eventCategory: eventCategory,
        eventAction: eventAction,
        eventLabel: eventLabel,
        eventValue: eventValue
      });
    }
  }
}
