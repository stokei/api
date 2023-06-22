import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { CreateSortedItemCommand } from '@/commands/implements/sorted-items/create-sorted-item.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { CatalogItemCreatedEvent } from '@/events/implements/catalog-items/catalog-item-created.event';
import { CatalogItemRemovedEvent } from '@/events/implements/catalog-items/catalog-item-removed.event';

@Injectable()
export class CatalogItemsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CatalogItemsSagas.name);
    this.logger.log(`Saga ${CatalogItemsSagas.name} init`);
  }

  @Saga()
  catalogItemCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CatalogItemCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CatalogItemCreatedEvent] Saga event catalogItemCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new CreateSortedItemCommand({
            parent: event.catalogItem.catalog,
            item: event.catalogItem.id,
            app: event.catalogItem.app,
            createdBy: event.createdBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  catalogItemRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CatalogItemRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CatalogItemRemovedEvent] Saga event catalogItemRemoved:' +
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
