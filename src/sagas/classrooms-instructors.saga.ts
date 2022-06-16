import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { ClassroomsInstructorCreatedEvent } from '@/events/implements/classrooms-instructors/classrooms-instructor-created.event';
import { ClassroomsInstructorRemovedEvent } from '@/events/implements/classrooms-instructors/classrooms-instructor-removed.event';
import { ClassroomsInstructorUpdatedEvent } from '@/events/implements/classrooms-instructors/classrooms-instructor-updated.event';

@Injectable()
export class ClassroomsInstructorsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ClassroomsInstructorsSagas.name);
    this.logger.log(`Saga ${ClassroomsInstructorsSagas.name} init`);
  }

  @Saga()
  classroomsInstructorCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsInstructorCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsInstructorCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsInstructorCreatedEvent] Saga event classroomsInstructorCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsInstructorRemoved = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsInstructorRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsInstructorRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsInstructorRemovedEvent] Saga event classroomsInstructorRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsInstructorUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsInstructorUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsInstructorUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsInstructorUpdatedEvent] Saga event classroomsInstructorUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
