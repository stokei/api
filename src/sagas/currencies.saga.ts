import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { CurrencyCreatedEvent } from '@/events/implements/currencies/currency-created.event';
import { CurrencyRemovedEvent } from '@/events/implements/currencies/currency-removed.event';
import { CurrencyUpdatedEvent } from '@/events/implements/currencies/currency-updated.event';

@Injectable()
export class CurrenciesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CurrenciesSagas.name);
    this.logger.log(`Saga ${CurrenciesSagas.name} init`);
  }

  @Saga()
  currencyCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CurrencyCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CurrencyCreatedEvent] Saga event currencyCreated: ' +
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
  currencyRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CurrencyRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CurrencyRemovedEvent] Saga event currencyRemoved:' +
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
  currencyUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CurrencyUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CurrencyUpdatedEvent] Saga event currencyUpdated:' +
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
