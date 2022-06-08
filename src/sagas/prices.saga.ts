import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { PriceCreatedEvent } from '@/events/implements/prices/price-created.event';
import { PriceRemovedEvent } from '@/events/implements/prices/price-removed.event';
import { PriceUpdatedEvent } from '@/events/implements/prices/price-updated.event';

@Injectable()
export class PricesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(PricesSagas.name);
    this.logger.log(`Saga ${PricesSagas.name} init`);
  }

  @Saga()
  priceCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PriceCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PriceCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PriceCreatedEvent] Saga event priceCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  priceRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PriceRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PriceRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PriceRemovedEvent] Saga event priceRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  priceUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PriceUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PriceUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PriceUpdatedEvent] Saga event priceUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
