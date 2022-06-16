import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { ClassroomsEnrollmentCreatedEvent } from '@/events/implements/classrooms-enrollments/classrooms-enrollment-created.event';
import { ClassroomsEnrollmentRemovedEvent } from '@/events/implements/classrooms-enrollments/classrooms-enrollment-removed.event';
import { ClassroomsEnrollmentUpdatedEvent } from '@/events/implements/classrooms-enrollments/classrooms-enrollment-updated.event';

@Injectable()
export class ClassroomsEnrollmentsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ClassroomsEnrollmentsSagas.name);
    this.logger.log(`Saga ${ClassroomsEnrollmentsSagas.name} init`);
  }

  @Saga()
  classroomsEnrollmentCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsEnrollmentCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsEnrollmentCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsEnrollmentCreatedEvent] Saga event classroomsEnrollmentCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsEnrollmentRemoved = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsEnrollmentRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsEnrollmentRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsEnrollmentRemovedEvent] Saga event classroomsEnrollmentRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsEnrollmentUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsEnrollmentUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsEnrollmentUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsEnrollmentUpdatedEvent] Saga event classroomsEnrollmentUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
