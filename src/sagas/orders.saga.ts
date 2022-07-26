import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { OrderCreatedEvent } from '@/events/implements/orders/order-created.event';

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
        const commands = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
