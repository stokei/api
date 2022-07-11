import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { VideoAuthorCreatedEvent } from '@/events/implements/video-authors/video-author-created.event';
import { VideoAuthorRemovedEvent } from '@/events/implements/video-authors/video-author-removed.event';
import { VideoAuthorUpdatedEvent } from '@/events/implements/video-authors/video-author-updated.event';

@Injectable()
export class VideoAuthorsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(VideoAuthorsSagas.name);
    this.logger.log(`Saga ${VideoAuthorsSagas.name} init`);
  }

  @Saga()
  videoAuthorCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideoAuthorCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideoAuthorCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideoAuthorCreatedEvent] Saga event videoAuthorCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  videoAuthorRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideoAuthorRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideoAuthorRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideoAuthorRemovedEvent] Saga event videoAuthorRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  videoAuthorUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideoAuthorUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideoAuthorUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideoAuthorUpdatedEvent] Saga event videoAuthorUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
