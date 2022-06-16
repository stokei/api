import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { CategoryCreatedEvent } from '@/events/implements/categories/category-created.event';
import { CategoryRemovedEvent } from '@/events/implements/categories/category-removed.event';
import { CategoryUpdatedEvent } from '@/events/implements/categories/category-updated.event';

@Injectable()
export class CategoriesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CategoriesSagas.name);
    this.logger.log(`Saga ${CategoriesSagas.name} init`);
  }

  @Saga()
  categoryCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CategoryCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CategoryCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CategoryCreatedEvent] Saga event categoryCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  categoryRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CategoryRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CategoryRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CategoryRemovedEvent] Saga event categoryRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  categoryUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CategoryUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CategoryUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CategoryUpdatedEvent] Saga event categoryUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
