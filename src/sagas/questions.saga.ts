import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { QuestionCreatedEvent } from '@/events/implements/questions/question-created.event';
import { QuestionRemovedEvent } from '@/events/implements/questions/question-removed.event';
import { QuestionUpdatedEvent } from '@/events/implements/questions/question-updated.event';

@Injectable()
export class QuestionsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(QuestionsSagas.name);
    this.logger.log(`Saga ${QuestionsSagas.name} init`);
  }

  @Saga()
  questionCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(QuestionCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [QuestionCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [QuestionCreatedEvent] Saga event questionCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  questionRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(QuestionRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [QuestionRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [QuestionRemovedEvent] Saga event questionRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  questionUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(QuestionUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [QuestionUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [QuestionUpdatedEvent] Saga event questionUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
