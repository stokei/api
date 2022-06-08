import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { VersionCreatedEvent } from '@/events/implements/versions/version-created.event';
import { VersionRemovedEvent } from '@/events/implements/versions/version-removed.event';
import { VersionUpdatedEvent } from '@/events/implements/versions/version-updated.event';

@Injectable()
export class VersionsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(VersionsSagas.name);
    this.logger.log(`Saga ${VersionsSagas.name} init`);
  }

  @Saga()
  versionCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VersionCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VersionCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VersionCreatedEvent] Saga event versionCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  versionRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VersionRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VersionRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VersionRemovedEvent] Saga event versionRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  versionUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VersionUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VersionUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [VersionUpdatedEvent] Saga event versionUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
