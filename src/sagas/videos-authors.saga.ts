import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { VideosAuthorCreatedEvent } from '@/events/implements/videos-authors/videos-author-created.event';
import { VideosAuthorRemovedEvent } from '@/events/implements/videos-authors/videos-author-removed.event';
import { VideosAuthorUpdatedEvent } from '@/events/implements/videos-authors/videos-author-updated.event';

@Injectable()
export class VideosAuthorsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(VideosAuthorsSagas.name);
    this.logger.log(`Saga ${VideosAuthorsSagas.name} init`);
  }

  @Saga()
  videosAuthorCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideosAuthorCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideosAuthorCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideosAuthorCreatedEvent] Saga event videosAuthorCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  videosAuthorRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideosAuthorRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideosAuthorRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideosAuthorRemovedEvent] Saga event videosAuthorRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  videosAuthorUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideosAuthorUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideosAuthorUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideosAuthorUpdatedEvent] Saga event videosAuthorUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
