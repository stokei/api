import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { FileCreatedEvent } from '@/events/implements/files/file-created.event';
import { FileRemovedEvent } from '@/events/implements/files/file-removed.event';
import { FileUpdatedEvent } from '@/events/implements/files/file-updated.event';

@Injectable()
export class FilesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(FilesSagas.name);
    this.logger.log(`Saga ${FilesSagas.name} init`);
  }

  @Saga()
  fileCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FileCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [FileCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [FileCreatedEvent] Saga event fileCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  fileRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FileRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [FileRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [FileRemovedEvent] Saga event fileRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  fileUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FileUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [FileUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [FileUpdatedEvent] Saga event fileUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
