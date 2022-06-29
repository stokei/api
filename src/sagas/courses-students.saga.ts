import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { CoursesStudentCreatedEvent } from '@/events/implements/courses-students/courses-student-created.event';
import { CoursesStudentRemovedEvent } from '@/events/implements/courses-students/courses-student-removed.event';
import { CoursesStudentUpdatedEvent } from '@/events/implements/courses-students/courses-student-updated.event';

@Injectable()
export class CoursesStudentsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CoursesStudentsSagas.name);
    this.logger.log(`Saga ${CoursesStudentsSagas.name} init`);
  }

  @Saga()
  coursesStudentCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CoursesStudentCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CoursesStudentCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CoursesStudentCreatedEvent] Saga event coursesStudentCreated: ' +
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
  coursesStudentRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CoursesStudentRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CoursesStudentRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CoursesStudentRemovedEvent] Saga event coursesStudentRemoved:' +
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
  coursesStudentUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CoursesStudentUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CoursesStudentUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CoursesStudentUpdatedEvent] Saga event coursesStudentUpdated:' +
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
