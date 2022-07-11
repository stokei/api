import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { PaymentMethodCreatedEvent } from '@/events/implements/payment-methods/payment-method-created.event';
import { PaymentMethodRemovedEvent } from '@/events/implements/payment-methods/payment-method-removed.event';
import { PaymentMethodUpdatedEvent } from '@/events/implements/payment-methods/payment-method-updated.event';

@Injectable()
export class PaymentMethodsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(PaymentMethodsSagas.name);
    this.logger.log(`Saga ${PaymentMethodsSagas.name} init`);
  }

  @Saga()
  paymentMethodCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentMethodCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PaymentMethodCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PaymentMethodCreatedEvent] Saga event paymentMethodCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  paymentMethodRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentMethodRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PaymentMethodRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PaymentMethodRemovedEvent] Saga event paymentMethodRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  paymentMethodUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentMethodUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PaymentMethodUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PaymentMethodUpdatedEvent] Saga event paymentMethodUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
