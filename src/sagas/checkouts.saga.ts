import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { CheckoutCreatedEvent } from '@/events/implements/checkouts/checkout-created.event';
import { CheckoutRemovedEvent } from '@/events/implements/checkouts/checkout-removed.event';
import { CheckoutUpdatedEvent } from '@/events/implements/checkouts/checkout-updated.event';

@Injectable()
export class CheckoutsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CheckoutsSagas.name);
    this.logger.log(`Saga ${CheckoutsSagas.name} init`);
  }

  @Saga()
  checkoutCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CheckoutCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CheckoutCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CheckoutCreatedEvent] Saga event checkoutCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  checkoutRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CheckoutRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CheckoutRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CheckoutRemovedEvent] Saga event checkoutRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  checkoutUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CheckoutUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CheckoutUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CheckoutUpdatedEvent] Saga event checkoutUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
