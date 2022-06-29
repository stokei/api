import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { PaymentsMethodCreatedEvent } from '@/events/implements/payments-methods/payments-method-created.event';
import { PaymentsMethodRemovedEvent } from '@/events/implements/payments-methods/payments-method-removed.event';
import { PaymentsMethodUpdatedEvent } from '@/events/implements/payments-methods/payments-method-updated.event';

@Injectable()
export class PaymentsMethodsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(PaymentsMethodsSagas.name);
    this.logger.log(`Saga ${PaymentsMethodsSagas.name} init`);
  }

  @Saga()
  paymentsMethodCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentsMethodCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PaymentsMethodCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PaymentsMethodCreatedEvent] Saga event paymentsMethodCreated: ' +
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
  paymentsMethodRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentsMethodRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PaymentsMethodRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PaymentsMethodRemovedEvent] Saga event paymentsMethodRemoved:' +
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
  paymentsMethodUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentsMethodUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PaymentsMethodUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PaymentsMethodUpdatedEvent] Saga event paymentsMethodUpdated:' +
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
