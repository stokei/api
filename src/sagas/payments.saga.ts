import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { PaymentCreatedEvent } from '@/events/implements/payments/payment-created.event';
import { PaymentRemovedEvent } from '@/events/implements/payments/payment-removed.event';
import { PaymentUpdatedEvent } from '@/events/implements/payments/payment-updated.event';

@Injectable()
export class PaymentsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(PaymentsSagas.name);
    this.logger.log(`Saga ${PaymentsSagas.name} init`);
  }

  @Saga()
  paymentCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PaymentCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PaymentCreatedEvent] Saga event paymentCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  paymentRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PaymentRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PaymentRemovedEvent] Saga event paymentRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  paymentUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PaymentUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PaymentUpdatedEvent] Saga event paymentUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
