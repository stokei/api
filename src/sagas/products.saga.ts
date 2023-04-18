import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { CreateCatalogItemCommand } from '@/commands/implements/catalog-items/create-catalog-item.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { ProductCreatedEvent } from '@/events/implements/products/product-created.event';
import { ProductUpdatedEvent } from '@/events/implements/products/product-updated.event';

@Injectable()
export class ProductsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ProductsSagas.name);
    this.logger.log(`Saga ${ProductsSagas.name} init`);
  }

  @Saga()
  productCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProductCreatedEvent] Saga event productCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        if (!!event.catalog) {
          commands.push(
            new CreateCatalogItemCommand({
              product: event.product.id,
              app: event.product.app,
              catalog: event.catalog,
              createdBy: event.createdBy
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  productUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProductUpdatedEvent] Saga event productUpdated: ' +
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
