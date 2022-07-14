import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { CartItemCreatedEvent } from '@/events/implements/cart-items/cart-item-created.event';
import { CartItemRemovedEvent } from '@/events/implements/cart-items/cart-item-removed.event';

@Injectable()
export class CartItemsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CartItemsSagas.name);
    this.logger.log(`Saga ${CartItemsSagas.name} init`);
  }

  @Saga()
  cartItemCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartItemCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CartItemCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CartItemCreatedEvent] Saga event cartItemCreated: ' +
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
  cartItemRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartItemRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CartItemRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CartItemRemovedEvent] Saga event cartItemRemoved:' +
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
