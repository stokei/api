import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { CheckoutsCurrencyCreatedEvent } from '@/events/implements/checkouts-currencies/checkouts-currency-created.event';
import { CheckoutsCurrencyRemovedEvent } from '@/events/implements/checkouts-currencies/checkouts-currency-removed.event';
import { CheckoutsCurrencyUpdatedEvent } from '@/events/implements/checkouts-currencies/checkouts-currency-updated.event';

@Injectable()
export class CheckoutsCurrenciesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CheckoutsCurrenciesSagas.name);
    this.logger.log(`Saga ${CheckoutsCurrenciesSagas.name} init`);
  }

  @Saga()
  checkoutsCurrencyCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(CheckoutsCurrencyCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CheckoutsCurrencyCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CheckoutsCurrencyCreatedEvent] Saga event checkoutsCurrencyCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  checkoutsCurrencyRemoved = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(CheckoutsCurrencyRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CheckoutsCurrencyRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CheckoutsCurrencyRemovedEvent] Saga event checkoutsCurrencyRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  checkoutsCurrencyUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(CheckoutsCurrencyUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CheckoutsCurrencyUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CheckoutsCurrencyUpdatedEvent] Saga event checkoutsCurrencyUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
