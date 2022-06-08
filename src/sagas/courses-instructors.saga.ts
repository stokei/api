import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
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
            JSON.stringify(event)
        );
        return null;
      })
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
            JSON.stringify(event)
        );
        return null;
      })
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
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
