import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { ProductsCategoryCreatedEvent } from '@/events/implements/products-categories/products-category-created.event';
import { ProductsCategoryRemovedEvent } from '@/events/implements/products-categories/products-category-removed.event';
import { ProductsCategoryUpdatedEvent } from '@/events/implements/products-categories/products-category-updated.event';

@Injectable()
export class ProductsCategoriesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ProductsCategoriesSagas.name);
    this.logger.log(`Saga ${ProductsCategoriesSagas.name} init`);
  }

  @Saga()
  productsCategoryCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductsCategoryCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProductsCategoryCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProductsCategoryCreatedEvent] Saga event productsCategoryCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  productsCategoryRemoved = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductsCategoryRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProductsCategoryRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProductsCategoryRemovedEvent] Saga event productsCategoryRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  productsCategoryUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductsCategoryUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProductsCategoryUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProductsCategoryUpdatedEvent] Saga event productsCategoryUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
