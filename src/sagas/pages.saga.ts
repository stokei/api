import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { PageCreatedEvent } from '@/events/implements/pages/page-created.event';
import { PageRemovedEvent } from '@/events/implements/pages/page-removed.event';
import { PageUpdatedEvent } from '@/events/implements/pages/page-updated.event';

@Injectable()
export class PagesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(PagesSagas.name);
    this.logger.log(`Saga ${PagesSagas.name} init`);
  }

  @Saga()
  pageCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PageCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PageCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PageCreatedEvent] Saga event pageCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  pageRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PageRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PageRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PageRemovedEvent] Saga event pageRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  pageUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PageUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PageUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PageUpdatedEvent] Saga event pageUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
