import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { ProjectCreatedEvent } from '@/events/implements/projects/project-created.event';
import { ProjectRemovedEvent } from '@/events/implements/projects/project-removed.event';
import { ProjectUpdatedEvent } from '@/events/implements/projects/project-updated.event';

@Injectable()
export class ProjectsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ProjectsSagas.name);
    this.logger.log(`Saga ${ProjectsSagas.name} init`);
  }

  @Saga()
  projectCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProjectCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProjectCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProjectCreatedEvent] Saga event projectCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  projectRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProjectRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProjectRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProjectRemovedEvent] Saga event projectRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  projectUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProjectUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ProjectUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ProjectUpdatedEvent] Saga event projectUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
