import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { AddAccountRoleCommand } from '@/commands/implements/accounts/add-account-role.command';
import { RemoveAccountRoleCommand } from '@/commands/implements/accounts/remove-account-role.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { AccountRole } from '@/enums/account-role.enum';
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
          new AddAccountRoleCommand({
            account: event.courseStudent.student,
            role: AccountRole.STUDENT,
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
            new RemoveAccountRoleCommand({
              account: event.courseStudent.student,
              role: AccountRole.STUDENT,
              removedBy: event.removedBy
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
