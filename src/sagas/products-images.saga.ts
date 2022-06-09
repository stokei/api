import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

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
            JSON.stringify(event)
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
            JSON.stringify(event)
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
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
