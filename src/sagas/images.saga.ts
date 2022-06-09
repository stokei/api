import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { ImageCreatedEvent } from '@/events/implements/images/image-created.event';
import { ImageRemovedEvent } from '@/events/implements/images/image-removed.event';
import { ImageUpdatedEvent } from '@/events/implements/images/image-updated.event';

@Injectable()
export class ImagesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ImagesSagas.name);
    this.logger.log(`Saga ${ImagesSagas.name} init`);
  }

  @Saga()
  imageCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ImageCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ImageCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ImageCreatedEvent] Saga event imageCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  imageRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ImageRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ImageRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ImageRemovedEvent] Saga event imageRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  imageUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ImageUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ImageUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ImageUpdatedEvent] Saga event imageUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
