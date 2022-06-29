import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { CartsItemCreatedEvent } from '@/events/implements/carts-items/carts-item-created.event';
import { CartsItemRemovedEvent } from '@/events/implements/carts-items/carts-item-removed.event';
import { CartsItemUpdatedEvent } from '@/events/implements/carts-items/carts-item-updated.event';

@Injectable()
export class CartsItemsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CartsItemsSagas.name);
    this.logger.log(`Saga ${CartsItemsSagas.name} init`);
  }

  @Saga()
  cartsItemCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartsItemCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CartsItemCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CartsItemCreatedEvent] Saga event cartsItemCreated: ' +
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
  cartsItemRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartsItemRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CartsItemRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CartsItemRemovedEvent] Saga event cartsItemRemoved:' +
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
  cartsItemUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartsItemUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CartsItemUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CartsItemUpdatedEvent] Saga event cartsItemUpdated:' +
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
