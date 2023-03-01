import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { CatalogCreatedEvent } from '@/events/implements/catalogs/catalog-created.event';
import { CatalogRemovedEvent } from '@/events/implements/catalogs/catalog-removed.event';
import { CatalogUpdatedEvent } from '@/events/implements/catalogs/catalog-updated.event';

@Injectable()
export class CatalogsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CatalogsSagas.name);
    this.logger.log(`Saga ${CatalogsSagas.name} init`);
  }

  @Saga()
  catalogCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CatalogCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CatalogCreatedEvent] Saga event catalogCreated: ' +
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
  catalogRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CatalogRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CatalogRemovedEvent] Saga event catalogRemoved:' +
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
  catalogUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CatalogUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CatalogUpdatedEvent] Saga event catalogUpdated:' +
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
