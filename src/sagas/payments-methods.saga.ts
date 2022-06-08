import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
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
            JSON.stringify(event)
        );
        return null;
      })
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
            JSON.stringify(event)
        );
        return null;
      })
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
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
