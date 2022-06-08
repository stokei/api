import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { OrdersSellerCreatedEvent } from '@/events/implements/orders-sellers/orders-seller-created.event';
import { OrdersSellerRemovedEvent } from '@/events/implements/orders-sellers/orders-seller-removed.event';
import { OrdersSellerUpdatedEvent } from '@/events/implements/orders-sellers/orders-seller-updated.event';

@Injectable()
export class OrdersSellersSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(OrdersSellersSagas.name);
    this.logger.log(`Saga ${OrdersSellersSagas.name} init`);
  }

  @Saga()
  ordersSellerCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrdersSellerCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrdersSellerCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [OrdersSellerCreatedEvent] Saga event ordersSellerCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  ordersSellerRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrdersSellerRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrdersSellerRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [OrdersSellerRemovedEvent] Saga event ordersSellerRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  ordersSellerUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrdersSellerUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrdersSellerUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [OrdersSellerUpdatedEvent] Saga event ordersSellerUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
