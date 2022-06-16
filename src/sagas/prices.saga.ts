import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

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
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
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
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
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
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
