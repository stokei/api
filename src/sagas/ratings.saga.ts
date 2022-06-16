import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { RatingCreatedEvent } from '@/events/implements/ratings/rating-created.event';
import { RatingRemovedEvent } from '@/events/implements/ratings/rating-removed.event';
import { RatingUpdatedEvent } from '@/events/implements/ratings/rating-updated.event';

@Injectable()
export class RatingsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(RatingsSagas.name);
    this.logger.log(`Saga ${RatingsSagas.name} init`);
  }

  @Saga()
  ratingCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RatingCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [RatingCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [RatingCreatedEvent] Saga event ratingCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  ratingRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RatingRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [RatingRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [RatingRemovedEvent] Saga event ratingRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  ratingUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RatingUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [RatingUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [RatingUpdatedEvent] Saga event ratingUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
