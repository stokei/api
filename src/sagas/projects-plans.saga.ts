import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { ProjectsPlanCreatedEvent } from '@/events/implements/projects-plans/projects-plan-created.event';
import { ProjectsPlanRemovedEvent } from '@/events/implements/projects-plans/projects-plan-removed.event';
import { ProjectsPlanUpdatedEvent } from '@/events/implements/projects-plans/projects-plan-updated.event';

@Injectable()
export class ProjectsPlansSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ProjectsPlansSagas.name);
    this.logger.log(`Saga ${ProjectsPlansSagas.name} init`);
  }

  @Saga()
  projectsPlanCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProjectsPlanCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProjectsPlanCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProjectsPlanCreatedEvent] Saga event projectsPlanCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  projectsPlanRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProjectsPlanRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProjectsPlanRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProjectsPlanRemovedEvent] Saga event projectsPlanRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  projectsPlanUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProjectsPlanUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProjectsPlanUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProjectsPlanUpdatedEvent] Saga event projectsPlanUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
