import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { PaymentCreatedEvent } from '@/events/implements/payments/payment-created.event';

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
