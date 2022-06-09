import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { AddressCreatedEvent } from '@/events/implements/addresses/address-created.event';
import { AddressRemovedEvent } from '@/events/implements/addresses/address-removed.event';
import { AddressUpdatedEvent } from '@/events/implements/addresses/address-updated.event';

@Injectable()
export class AddressesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(AddressesSagas.name);
    this.logger.log(`Saga ${AddressesSagas.name} init`);
  }

  @Saga()
  addressCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AddressCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AddressCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [AddressCreatedEvent] Saga event addressCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  addressRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AddressRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AddressRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [AddressRemovedEvent] Saga event addressRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  addressUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AddressUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AddressUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [AddressUpdatedEvent] Saga event addressUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
