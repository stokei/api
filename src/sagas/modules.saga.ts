import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { ModuleCreatedEvent } from '@/events/implements/modules/module-created.event';
import { ModuleRemovedEvent } from '@/events/implements/modules/module-removed.event';
import { ModuleUpdatedEvent } from '@/events/implements/modules/module-updated.event';

@Injectable()
export class ModulesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ModulesSagas.name);
    this.logger.log(`Saga ${ModulesSagas.name} init`);
  }

  @Saga()
  moduleCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ModuleCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ModuleCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ModuleCreatedEvent] Saga event moduleCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  moduleRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ModuleRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ModuleRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ModuleRemovedEvent] Saga event moduleRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  moduleUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ModuleUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ModuleUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ModuleUpdatedEvent] Saga event moduleUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
