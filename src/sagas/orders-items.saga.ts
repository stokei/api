import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { OrdersItemCreatedEvent } from '@/events/implements/orders-items/orders-item-created.event';
import { OrdersItemRemovedEvent } from '@/events/implements/orders-items/orders-item-removed.event';
import { OrdersItemUpdatedEvent } from '@/events/implements/orders-items/orders-item-updated.event';

@Injectable()
export class OrdersItemsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(OrdersItemsSagas.name);
    this.logger.log(`Saga ${OrdersItemsSagas.name} init`);
  }

  @Saga()
  ordersItemCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrdersItemCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrdersItemCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [OrdersItemCreatedEvent] Saga event ordersItemCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  ordersItemRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrdersItemRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrdersItemRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [OrdersItemRemovedEvent] Saga event ordersItemRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  ordersItemUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrdersItemUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrdersItemUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [OrdersItemUpdatedEvent] Saga event ordersItemUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
