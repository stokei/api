import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { SitesDarkColorCreatedEvent } from '@/events/implements/sites-dark-colors/sites-dark-color-created.event';
import { SitesDarkColorRemovedEvent } from '@/events/implements/sites-dark-colors/sites-dark-color-removed.event';
import { SitesDarkColorUpdatedEvent } from '@/events/implements/sites-dark-colors/sites-dark-color-updated.event';

@Injectable()
export class SitesDarkColorsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(SitesDarkColorsSagas.name);
    this.logger.log(`Saga ${SitesDarkColorsSagas.name} init`);
  }

  @Saga()
  sitesDarkColorCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SitesDarkColorCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SitesDarkColorCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [SitesDarkColorCreatedEvent] Saga event sitesDarkColorCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  sitesDarkColorRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SitesDarkColorRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SitesDarkColorRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [SitesDarkColorRemovedEvent] Saga event sitesDarkColorRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  sitesDarkColorUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SitesDarkColorUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SitesDarkColorUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [SitesDarkColorUpdatedEvent] Saga event sitesDarkColorUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
