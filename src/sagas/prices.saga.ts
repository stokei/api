import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { UpdateProductCommand } from '@/commands/implements/products/update-product.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { PriceActivatedEvent } from '@/events/implements/prices/price-activated.event';
import { PriceCreatedEvent } from '@/events/implements/prices/price-created.event';
import { PriceDeactivatedEvent } from '@/events/implements/prices/price-deactivated.event';
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
          'Inside [PriceCreatedEvent] Saga event priceCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        if (event.defaultPrice) {
          commands.push(
            new UpdateProductCommand({
              data: {
                defaultPrice: event.price.id,
                updatedBy: event.createdBy
              },
              where: {
                product: event.price.parent,
                app: event.price.app
              }
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  priceRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PriceRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PriceRemovedEvent] Saga event priceRemoved:' +
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
  priceUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PriceUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PriceUpdatedEvent] Saga event priceUpdated:' +
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
  priceActivated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PriceActivatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PriceActivatedEvent] Saga event priceActivated:' +
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
  priceDeactivated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PriceDeactivatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PriceDeactivatedEvent] Saga event priceDeactivated:' +
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
