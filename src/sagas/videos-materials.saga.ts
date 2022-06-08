import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { VideosMaterialCreatedEvent } from '@/events/implements/videos-materials/videos-material-created.event';
import { VideosMaterialRemovedEvent } from '@/events/implements/videos-materials/videos-material-removed.event';
import { VideosMaterialUpdatedEvent } from '@/events/implements/videos-materials/videos-material-updated.event';

@Injectable()
export class VideosMaterialsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(VideosMaterialsSagas.name);
    this.logger.log(`Saga ${VideosMaterialsSagas.name} init`);
  }

  @Saga()
  videosMaterialCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideosMaterialCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideosMaterialCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideosMaterialCreatedEvent] Saga event videosMaterialCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  videosMaterialRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideosMaterialRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideosMaterialRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideosMaterialRemovedEvent] Saga event videosMaterialRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  videosMaterialUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideosMaterialUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideosMaterialUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VideosMaterialUpdatedEvent] Saga event videosMaterialUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
