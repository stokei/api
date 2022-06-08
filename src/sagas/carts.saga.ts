import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { CartCreatedEvent } from '@/events/implements/carts/cart-created.event';
import { CartRemovedEvent } from '@/events/implements/carts/cart-removed.event';
import { CartUpdatedEvent } from '@/events/implements/carts/cart-updated.event';

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
          'Inside [CartCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CartCreatedEvent] Saga event cartCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  cartRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CartRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CartRemovedEvent] Saga event cartRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  cartUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CartUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CartUpdatedEvent] Saga event cartUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
