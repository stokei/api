import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { VideoCreatedEvent } from '@/events/implements/videos/video-created.event';
import { VideoRemovedEvent } from '@/events/implements/videos/video-removed.event';
import { VideoUpdatedEvent } from '@/events/implements/videos/video-updated.event';

@Injectable()
export class VideosSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(VideosSagas.name);
    this.logger.log(`Saga ${VideosSagas.name} init`);
  }

  @Saga()
  videoCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideoCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideoCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideoCreatedEvent] Saga event videoCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  videoRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideoRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideoRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideoRemovedEvent] Saga event videoRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  videoUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideoUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideoUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideoUpdatedEvent] Saga event videoUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
