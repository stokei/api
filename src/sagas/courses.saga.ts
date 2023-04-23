import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { CreateCourseInstructorCommand } from '@/commands/implements/course-instructors/create-course-instructor.command';
import { AddCourseToAppSubscriptionContractCommand } from '@/commands/implements/courses/add-course-to-app-subscription-contract.command';
import { RemoveCourseFromAppSubscriptionContractCommand } from '@/commands/implements/courses/remove-course-from-app-subscription-contract.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { CourseCreatedEvent } from '@/events/implements/courses/course-created.event';
import { CourseRemovedEvent } from '@/events/implements/courses/course-removed.event';
import { CourseUpdatedEvent } from '@/events/implements/courses/course-updated.event';

@Injectable()
export class CoursesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CoursesSagas.name);
    this.logger.log(`Saga ${CoursesSagas.name} init`);
  }

  @Saga()
  courseCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CourseCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CourseCreatedEvent] Saga event courseCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new AddCourseToAppSubscriptionContractCommand({
            course: event.course.id,
            createdBy: event.createdBy
          }),
          new CreateCourseInstructorCommand({
            course: event.course.id,
            app: event.course.app,
            instructor: event.createdBy,
            createdBy: event.createdBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  courseRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CourseRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CourseRemovedEvent] Saga event courseRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new RemoveCourseFromAppSubscriptionContractCommand({
            course: event.course.id,
            removedBy: event.removedBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  courseUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CourseUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CourseUpdatedEvent] Saga event courseUpdated:' +
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
