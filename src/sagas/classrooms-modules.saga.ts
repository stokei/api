import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { ClassroomsModuleCreatedEvent } from '@/events/implements/classrooms-modules/classrooms-module-created.event';
import { ClassroomsModuleRemovedEvent } from '@/events/implements/classrooms-modules/classrooms-module-removed.event';
import { ClassroomsModuleUpdatedEvent } from '@/events/implements/classrooms-modules/classrooms-module-updated.event';

@Injectable()
export class ClassroomsModulesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ClassroomsModulesSagas.name);
    this.logger.log(`Saga ${ClassroomsModulesSagas.name} init`);
  }

  @Saga()
  classroomsModuleCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsModuleCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsModuleCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsModuleCreatedEvent] Saga event classroomsModuleCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsModuleRemoved = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsModuleRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsModuleRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsModuleRemovedEvent] Saga event classroomsModuleRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsModuleUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsModuleUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsModuleUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsModuleUpdatedEvent] Saga event classroomsModuleUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
