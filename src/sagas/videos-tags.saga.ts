import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { VideosTagCreatedEvent } from '@/events/implements/videos-tags/videos-tag-created.event';
import { VideosTagRemovedEvent } from '@/events/implements/videos-tags/videos-tag-removed.event';
import { VideosTagUpdatedEvent } from '@/events/implements/videos-tags/videos-tag-updated.event';

@Injectable()
export class VideosTagsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(VideosTagsSagas.name);
    this.logger.log(`Saga ${VideosTagsSagas.name} init`);
  }

  @Saga()
  videosTagCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideosTagCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideosTagCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideosTagCreatedEvent] Saga event videosTagCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  videosTagRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideosTagRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideosTagRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideosTagRemovedEvent] Saga event videosTagRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  videosTagUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideosTagUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideosTagUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideosTagUpdatedEvent] Saga event videosTagUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
