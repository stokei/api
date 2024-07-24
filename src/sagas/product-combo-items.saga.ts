import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { ProductComboItemCreatedEvent } from '@/events/implements/product-combo-items/product-combo-item-created.event';
import { ProductComboItemRemovedEvent } from '@/events/implements/product-combo-items/product-combo-item-removed.event';

@Injectable()
export class ProductComboItemsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ProductComboItemsSagas.name);
    this.logger.log(`Saga ${ProductComboItemsSagas.name} init`);
  }

  @Saga()
  productComboItemCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductComboItemCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProductComboItemCreatedEvent] Saga event productComboItemCreated: ' +
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
  productComboItemRemoved = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductComboItemRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProductComboItemRemovedEvent] Saga event productComboItemRemoved:' +
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
