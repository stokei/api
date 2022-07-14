import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { ClassroomStudentCreatedEvent } from '@/events/implements/classroom-students/classroom-student-created.event';
import { ClassroomStudentRemovedEvent } from '@/events/implements/classroom-students/classroom-student-removed.event';

@Injectable()
export class ClassroomStudentsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ClassroomStudentsSagas.name);
    this.logger.log(`Saga ${ClassroomStudentsSagas.name} init`);
  }

  @Saga()
  classroomStudentCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomStudentCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomStudentCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomStudentCreatedEvent] Saga event classroomStudentCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  classroomStudentRemoved = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomStudentRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomStudentRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomStudentRemovedEvent] Saga event classroomStudentRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
