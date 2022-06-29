import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { CoursesInstructorCreatedEvent } from '@/events/implements/courses-instructors/courses-instructor-created.event';
import { CoursesInstructorRemovedEvent } from '@/events/implements/courses-instructors/courses-instructor-removed.event';
import { CoursesInstructorUpdatedEvent } from '@/events/implements/courses-instructors/courses-instructor-updated.event';

@Injectable()
export class CoursesInstructorsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CoursesInstructorsSagas.name);
    this.logger.log(`Saga ${CoursesInstructorsSagas.name} init`);
  }

  @Saga()
  coursesInstructorCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(CoursesInstructorCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CoursesInstructorCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CoursesInstructorCreatedEvent] Saga event coursesInstructorCreated: ' +
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
  coursesInstructorRemoved = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(CoursesInstructorRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CoursesInstructorRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CoursesInstructorRemovedEvent] Saga event coursesInstructorRemoved:' +
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
  coursesInstructorUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(CoursesInstructorUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CoursesInstructorUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CoursesInstructorUpdatedEvent] Saga event coursesInstructorUpdated:' +
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
