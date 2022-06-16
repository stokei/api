import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { AnswerCreatedEvent } from '@/events/implements/answers/answer-created.event';
import { AnswerRemovedEvent } from '@/events/implements/answers/answer-removed.event';
import { AnswerUpdatedEvent } from '@/events/implements/answers/answer-updated.event';

@Injectable()
export class AnswersSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(AnswersSagas.name);
    this.logger.log(`Saga ${AnswersSagas.name} init`);
  }

  @Saga()
  answerCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AnswerCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AnswerCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [AnswerCreatedEvent] Saga event answerCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  answerRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AnswerRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AnswerRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [AnswerRemovedEvent] Saga event answerRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  answerUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AnswerUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AnswerUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [AnswerUpdatedEvent] Saga event answerUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
