import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
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
            JSON.stringify(event)
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
            JSON.stringify(event)
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
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
