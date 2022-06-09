import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { OrdersAddressCreatedEvent } from '@/events/implements/orders-addresses/orders-address-created.event';
import { OrdersAddressRemovedEvent } from '@/events/implements/orders-addresses/orders-address-removed.event';
import { OrdersAddressUpdatedEvent } from '@/events/implements/orders-addresses/orders-address-updated.event';

@Injectable()
export class OrdersAddressesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(OrdersAddressesSagas.name);
    this.logger.log(`Saga ${OrdersAddressesSagas.name} init`);
  }

  @Saga()
  ordersAddressCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrdersAddressCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrdersAddressCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [OrdersAddressCreatedEvent] Saga event ordersAddressCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  ordersAddressRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrdersAddressRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrdersAddressRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [OrdersAddressRemovedEvent] Saga event ordersAddressRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  ordersAddressUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrdersAddressUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrdersAddressUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [OrdersAddressUpdatedEvent] Saga event ordersAddressUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
