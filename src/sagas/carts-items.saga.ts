import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

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
            JSON.stringify(event)
        );
        return null;
      })
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
            JSON.stringify(event)
        );
        return null;
      })
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
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
