import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { PriceTierCreatedEvent } from '@/events/implements/price-tiers/price-tier-created.event';
import { PriceTierRemovedEvent } from '@/events/implements/price-tiers/price-tier-removed.event';
import { PriceTierUpdatedEvent } from '@/events/implements/price-tiers/price-tier-updated.event';

@Injectable()
export class PriceTiersSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(PriceTiersSagas.name);
    this.logger.log(`Saga ${PriceTiersSagas.name} init`);
  }

  @Saga()
  priceTierCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PriceTierCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PriceTierCreatedEvent] Saga event priceTierCreated: ' +
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
  priceTierRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PriceTierRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PriceTierRemovedEvent] Saga event priceTierRemoved:' +
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
  priceTierUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PriceTierUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PriceTierUpdatedEvent] Saga event priceTierUpdated:' +
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
