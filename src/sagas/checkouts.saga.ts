import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
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
            JSON.stringify(event)
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
            JSON.stringify(event)
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
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
