import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { ClassroomsStudentCreatedEvent } from '@/events/implements/classrooms-students/classrooms-student-created.event';
import { ClassroomsStudentRemovedEvent } from '@/events/implements/classrooms-students/classrooms-student-removed.event';
import { ClassroomsStudentUpdatedEvent } from '@/events/implements/classrooms-students/classrooms-student-updated.event';

@Injectable()
export class ClassroomsStudentsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ClassroomsStudentsSagas.name);
    this.logger.log(`Saga ${ClassroomsStudentsSagas.name} init`);
  }

  @Saga()
  classroomsStudentCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsStudentCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsStudentCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsStudentCreatedEvent] Saga event classroomsStudentCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsStudentRemoved = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsStudentRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsStudentRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsStudentRemovedEvent] Saga event classroomsStudentRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsStudentUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsStudentUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsStudentUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsStudentUpdatedEvent] Saga event classroomsStudentUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
