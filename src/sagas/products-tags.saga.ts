import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { ProductsTagCreatedEvent } from '@/events/implements/products-tags/products-tag-created.event';
import { ProductsTagRemovedEvent } from '@/events/implements/products-tags/products-tag-removed.event';
import { ProductsTagUpdatedEvent } from '@/events/implements/products-tags/products-tag-updated.event';

@Injectable()
export class ProductsTagsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ProductsTagsSagas.name);
    this.logger.log(`Saga ${ProductsTagsSagas.name} init`);
  }

  @Saga()
  productsTagCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductsTagCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProductsTagCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProductsTagCreatedEvent] Saga event productsTagCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  productsTagRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductsTagRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProductsTagRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProductsTagRemovedEvent] Saga event productsTagRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  productsTagUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductsTagUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProductsTagUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProductsTagUpdatedEvent] Saga event productsTagUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
