import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { CommentCreatedEvent } from '@/events/implements/comments/comment-created.event';
import { CommentRemovedEvent } from '@/events/implements/comments/comment-removed.event';
import { CommentUpdatedEvent } from '@/events/implements/comments/comment-updated.event';

@Injectable()
export class CommentsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CommentsSagas.name);
    this.logger.log(`Saga ${CommentsSagas.name} init`);
  }

  @Saga()
  commentCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CommentCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CommentCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CommentCreatedEvent] Saga event commentCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  commentRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CommentRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CommentRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CommentRemovedEvent] Saga event commentRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  commentUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CommentUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CommentUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CommentUpdatedEvent] Saga event commentUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
