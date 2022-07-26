import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { CartCreatedEvent } from '@/events/implements/carts/cart-created.event';

@Injectable()
export class CartsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CartsSagas.name);
    this.logger.log(`Saga ${CartsSagas.name} init`);
  }

  @Saga()
  cartCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CartCreatedEvent] Saga event cartCreated: ' +
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
