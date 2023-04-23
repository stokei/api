import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { CreateRoleCommand } from '@/commands/implements/roles/create-role.command';
import { RemoveRoleCommand } from '@/commands/implements/roles/remove-role.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { roleName } from '@/constants/role-name';
import { CourseStudentCreatedEvent } from '@/events/implements/course-students/course-student-created.event';
import { CourseStudentRemovedEvent } from '@/events/implements/course-students/course-student-removed.event';

@Injectable()
export class CourseStudentsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CourseStudentsSagas.name);
    this.logger.log(`Saga ${CourseStudentsSagas.name} init`);
  }

  @Saga()
  courseStudentCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CourseStudentCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CourseStudentCreatedEvent] Saga event courseStudentCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new CreateRoleCommand({
            parent: event.courseStudent.student,
            name: roleName.STUDENT,
            app: event.courseStudent.app,
            createdBy: event.createdBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  courseStudentRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CourseStudentRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CourseStudentRemovedEvent] Saga event courseStudentRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        if (event.isLastCourseStudent) {
          commands.push(
            new RemoveRoleCommand({
              where: {
                parent: event.courseStudent.student,
                name: roleName.STUDENT,
                app: event.courseStudent.app,
                removedBy: event.removedBy
              }
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
