import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { CardCreatedEvent } from '@/events/implements/cards/card-created.event';
import { CardRemovedEvent } from '@/events/implements/cards/card-removed.event';
import { CardUpdatedEvent } from '@/events/implements/cards/card-updated.event';

@Injectable()
export class CardsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CardsSagas.name);
    this.logger.log(`Saga ${CardsSagas.name} init`);
  }

  @Saga()
  cardCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CardCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CardCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CardCreatedEvent] Saga event cardCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  cardRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CardRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CardRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CardRemovedEvent] Saga event cardRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  cardUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CardUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CardUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CardUpdatedEvent] Saga event cardUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
