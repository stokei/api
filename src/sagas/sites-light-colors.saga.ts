import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { SitesLightColorCreatedEvent } from '@/events/implements/sites-light-colors/sites-light-color-created.event';
import { SitesLightColorRemovedEvent } from '@/events/implements/sites-light-colors/sites-light-color-removed.event';
import { SitesLightColorUpdatedEvent } from '@/events/implements/sites-light-colors/sites-light-color-updated.event';

@Injectable()
export class SitesLightColorsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(SitesLightColorsSagas.name);
    this.logger.log(`Saga ${SitesLightColorsSagas.name} init`);
  }

  @Saga()
  sitesLightColorCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SitesLightColorCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SitesLightColorCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [SitesLightColorCreatedEvent] Saga event sitesLightColorCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  sitesLightColorRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SitesLightColorRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SitesLightColorRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [SitesLightColorRemovedEvent] Saga event sitesLightColorRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  sitesLightColorUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SitesLightColorUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SitesLightColorUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [SitesLightColorUpdatedEvent] Saga event sitesLightColorUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
