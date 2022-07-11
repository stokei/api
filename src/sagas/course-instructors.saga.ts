import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { CourseInstructorCreatedEvent } from '@/events/implements/course-instructors/course-instructor-created.event';
import { CourseInstructorRemovedEvent } from '@/events/implements/course-instructors/course-instructor-removed.event';
import { CourseInstructorUpdatedEvent } from '@/events/implements/course-instructors/course-instructor-updated.event';

@Injectable()
export class CourseInstructorsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CourseInstructorsSagas.name);
    this.logger.log(`Saga ${CourseInstructorsSagas.name} init`);
  }

  @Saga()
  courseInstructorCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(CourseInstructorCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CourseInstructorCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CourseInstructorCreatedEvent] Saga event courseInstructorCreated: ' +
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
  courseInstructorRemoved = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(CourseInstructorRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CourseInstructorRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CourseInstructorRemovedEvent] Saga event courseInstructorRemoved:' +
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
  courseInstructorUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(CourseInstructorUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CourseInstructorUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CourseInstructorUpdatedEvent] Saga event courseInstructorUpdated:' +
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
