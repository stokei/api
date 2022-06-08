import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
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
          'Inside [CurrencyCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CurrencyCreatedEvent] Saga event currencyCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  currencyRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CurrencyRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CurrencyRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CurrencyRemovedEvent] Saga event currencyRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  currencyUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CurrencyUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CurrencyUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CurrencyUpdatedEvent] Saga event currencyUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
