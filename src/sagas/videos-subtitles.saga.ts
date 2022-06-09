import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { VideosSubtitleCreatedEvent } from '@/events/implements/videos-subtitles/videos-subtitle-created.event';
import { VideosSubtitleRemovedEvent } from '@/events/implements/videos-subtitles/videos-subtitle-removed.event';
import { VideosSubtitleUpdatedEvent } from '@/events/implements/videos-subtitles/videos-subtitle-updated.event';

@Injectable()
export class VideosSubtitlesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(VideosSubtitlesSagas.name);
    this.logger.log(`Saga ${VideosSubtitlesSagas.name} init`);
  }

  @Saga()
  videosSubtitleCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideosSubtitleCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideosSubtitleCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideosSubtitleCreatedEvent] Saga event videosSubtitleCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  videosSubtitleRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideosSubtitleRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideosSubtitleRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideosSubtitleRemovedEvent] Saga event videosSubtitleRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  videosSubtitleUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideosSubtitleUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideosSubtitleUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideosSubtitleUpdatedEvent] Saga event videosSubtitleUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
