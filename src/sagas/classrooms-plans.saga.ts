import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { ClassroomsPlanCreatedEvent } from '@/events/implements/classrooms-plans/classrooms-plan-created.event';
import { ClassroomsPlanRemovedEvent } from '@/events/implements/classrooms-plans/classrooms-plan-removed.event';
import { ClassroomsPlanUpdatedEvent } from '@/events/implements/classrooms-plans/classrooms-plan-updated.event';

@Injectable()
export class ClassroomsPlansSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ClassroomsPlansSagas.name);
    this.logger.log(`Saga ${ClassroomsPlansSagas.name} init`);
  }

  @Saga()
  classroomsPlanCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsPlanCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsPlanCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsPlanCreatedEvent] Saga event classroomsPlanCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsPlanRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsPlanRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsPlanRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsPlanRemovedEvent] Saga event classroomsPlanRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsPlanUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsPlanUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsPlanUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsPlanUpdatedEvent] Saga event classroomsPlanUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
