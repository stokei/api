import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { ProductsImageCreatedEvent } from '@/events/implements/products-images/products-image-created.event';
import { ProductsImageRemovedEvent } from '@/events/implements/products-images/products-image-removed.event';
import { ProductsImageUpdatedEvent } from '@/events/implements/products-images/products-image-updated.event';

@Injectable()
export class ProductsImagesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ProductsImagesSagas.name);
    this.logger.log(`Saga ${ProductsImagesSagas.name} init`);
  }

  @Saga()
  productsImageCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductsImageCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProductsImageCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProductsImageCreatedEvent] Saga event productsImageCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  productsImageRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductsImageRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProductsImageRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProductsImageRemovedEvent] Saga event productsImageRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  productsImageUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductsImageUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProductsImageUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProductsImageUpdatedEvent] Saga event productsImageUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
