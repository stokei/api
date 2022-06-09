import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { ProjectsMemberCreatedEvent } from '@/events/implements/projects-members/projects-member-created.event';
import { ProjectsMemberRemovedEvent } from '@/events/implements/projects-members/projects-member-removed.event';
import { ProjectsMemberUpdatedEvent } from '@/events/implements/projects-members/projects-member-updated.event';

@Injectable()
export class ProjectsMembersSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ProjectsMembersSagas.name);
    this.logger.log(`Saga ${ProjectsMembersSagas.name} init`);
  }

  @Saga()
  projectsMemberCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProjectsMemberCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProjectsMemberCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProjectsMemberCreatedEvent] Saga event projectsMemberCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  projectsMemberRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProjectsMemberRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProjectsMemberRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProjectsMemberRemovedEvent] Saga event projectsMemberRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  projectsMemberUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProjectsMemberUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProjectsMemberUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProjectsMemberUpdatedEvent] Saga event projectsMemberUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
