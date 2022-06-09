import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { PhoneCreatedEvent } from '@/events/implements/phones/phone-created.event';
import { PhoneRemovedEvent } from '@/events/implements/phones/phone-removed.event';
import { PhoneUpdatedEvent } from '@/events/implements/phones/phone-updated.event';

@Injectable()
export class PhonesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(PhonesSagas.name);
    this.logger.log(`Saga ${PhonesSagas.name} init`);
  }

  @Saga()
  phoneCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PhoneCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PhoneCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PhoneCreatedEvent] Saga event phoneCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  phoneRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PhoneRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PhoneRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PhoneRemovedEvent] Saga event phoneRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  phoneUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PhoneUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PhoneUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PhoneUpdatedEvent] Saga event phoneUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
