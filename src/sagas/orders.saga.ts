import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { SendOrdersCustomersOrderCreatedEmailCommand } from '@/commands/implements/emails/orders/customers/send-order-created-email.command';
import { ActivateOrderSubscriptionContractsCommand } from '@/commands/implements/orders/activate-order-subscription-contracts.command';
import { CancelOrderSubscriptionContractsCommand } from '@/commands/implements/orders/cancel-order-subscription-contracts.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { OrderChangedToPaidEvent } from '@/events/implements/orders/order-changed-to-paid.event';
import { OrderChangedToPaymentErrorEvent } from '@/events/implements/orders/order-changed-to-payment-error.event';
import { OrderCreatedEvent } from '@/events/implements/orders/order-created.event';
import { OrderRemovedEvent } from '@/events/implements/orders/order-removed.event';
import { OrderUpdatedEvent } from '@/events/implements/orders/order-updated.event';

@Injectable()
export class OrdersSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(OrdersSagas.name);
    this.logger.log(`Saga ${OrdersSagas.name} init`);
  }

  @Saga()
  orderCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrderCreatedEvent] Saga event orderCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new SendOrdersCustomersOrderCreatedEmailCommand({
            order: event.order,
            app: event.order.app,
            toAccount: event.order.parent,
            createdBy: event.createdBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  orderRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrderRemovedEvent] Saga event orderRemoved:' +
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
  orderUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrderUpdatedEvent] Saga event orderUpdated:' +
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
  orderChangedToPaymentError = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderChangedToPaymentErrorEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrderChangedToPaymentErrorEvent] Saga event orderChangedToPaymentError: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new CancelOrderSubscriptionContractsCommand({
            app: event.order.app,
            order: event.order.id,
            createdBy: event.updatedBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  orderChangedToPaid = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderChangedToPaidEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrderChangedToPaidEvent] Saga event orderChangedToPaid: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new ActivateOrderSubscriptionContractsCommand({
            app: event.order.app,
            order: event.order.id,
            createdBy: event.updatedBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
