import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { ModulesVideoCreatedEvent } from '@/events/implements/modules-videos/modules-video-created.event';
import { ModulesVideoRemovedEvent } from '@/events/implements/modules-videos/modules-video-removed.event';
import { ModulesVideoUpdatedEvent } from '@/events/implements/modules-videos/modules-video-updated.event';

@Injectable()
export class ModulesVideosSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ModulesVideosSagas.name);
    this.logger.log(`Saga ${ModulesVideosSagas.name} init`);
  }

  @Saga()
  modulesVideoCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ModulesVideoCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ModulesVideoCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ModulesVideoCreatedEvent] Saga event modulesVideoCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  modulesVideoRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ModulesVideoRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ModulesVideoRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ModulesVideoRemovedEvent] Saga event modulesVideoRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  modulesVideoUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ModulesVideoUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ModulesVideoUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ModulesVideoUpdatedEvent] Saga event modulesVideoUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
