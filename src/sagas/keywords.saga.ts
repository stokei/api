import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { KeywordCreatedEvent } from '@/events/implements/keywords/keyword-created.event';
import { KeywordRemovedEvent } from '@/events/implements/keywords/keyword-removed.event';
import { KeywordUpdatedEvent } from '@/events/implements/keywords/keyword-updated.event';

@Injectable()
export class KeywordsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(KeywordsSagas.name);
    this.logger.log(`Saga ${KeywordsSagas.name} init`);
  }

  @Saga()
  keywordCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(KeywordCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [KeywordCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [KeywordCreatedEvent] Saga event keywordCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  keywordRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(KeywordRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [KeywordRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [KeywordRemovedEvent] Saga event keywordRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  keywordUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(KeywordUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [KeywordUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [KeywordUpdatedEvent] Saga event keywordUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
