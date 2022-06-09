import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { MetatagCreatedEvent } from '@/events/implements/metatags/metatag-created.event';
import { MetatagRemovedEvent } from '@/events/implements/metatags/metatag-removed.event';
import { MetatagUpdatedEvent } from '@/events/implements/metatags/metatag-updated.event';

@Injectable()
export class MetatagsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(MetatagsSagas.name);
    this.logger.log(`Saga ${MetatagsSagas.name} init`);
  }

  @Saga()
  metatagCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MetatagCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [MetatagCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [MetatagCreatedEvent] Saga event metatagCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  metatagRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MetatagRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [MetatagRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [MetatagRemovedEvent] Saga event metatagRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  metatagUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MetatagUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [MetatagUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [MetatagUpdatedEvent] Saga event metatagUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
