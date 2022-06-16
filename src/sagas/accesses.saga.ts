import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { AccessCreatedEvent } from '@/events/implements/accesses/access-created.event';
import { AccessRemovedEvent } from '@/events/implements/accesses/access-removed.event';
import { AccessUpdatedEvent } from '@/events/implements/accesses/access-updated.event';

@Injectable()
export class AccessesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(AccessesSagas.name);
    this.logger.log(`Saga ${AccessesSagas.name} init`);
  }

  @Saga()
  accessCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccessCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AccessCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [AccessCreatedEvent] Saga event accessCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  accessRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccessRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AccessRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [AccessRemovedEvent] Saga event accessRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  accessUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccessUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AccessUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [AccessUpdatedEvent] Saga event accessUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
