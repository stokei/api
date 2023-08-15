import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { OrderItemCreatedEvent } from '@/events/implements/order-items/order-item-created.event';
import { OrderItemRemovedEvent } from '@/events/implements/order-items/order-item-removed.event';
import { OrderItemUpdatedEvent } from '@/events/implements/order-items/order-item-updated.event';

@Injectable()
export class OrderItemsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(OrderItemsSagas.name);
    this.logger.log(`Saga ${OrderItemsSagas.name} init`);
  }

  @Saga()
  orderItemCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderItemCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrderItemCreatedEvent] Saga event orderItemCreated: ' +
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
  orderItemRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderItemRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrderItemRemovedEvent] Saga event orderItemRemoved:' +
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
  orderItemUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderItemUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [OrderItemUpdatedEvent] Saga event orderItemUpdated:' +
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
