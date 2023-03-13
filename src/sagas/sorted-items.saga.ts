import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { SortedItemCreatedEvent } from '@/events/implements/sorted-items/sorted-item-created.event';
import { SortedItemRemovedEvent } from '@/events/implements/sorted-items/sorted-item-removed.event';
import { SortedItemUpdatedEvent } from '@/events/implements/sorted-items/sorted-item-updated.event';

@Injectable()
export class SortedItemsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(SortedItemsSagas.name);
    this.logger.log(`Saga ${SortedItemsSagas.name} init`);
  }

  @Saga()
  sortedItemCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SortedItemCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SortedItemCreatedEvent] Saga event sortedItemCreated: ' +
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
  sortedItemRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SortedItemRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SortedItemRemovedEvent] Saga event sortedItemRemoved:' +
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
  sortedItemUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SortedItemUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SortedItemUpdatedEvent] Saga event sortedItemUpdated:' +
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
