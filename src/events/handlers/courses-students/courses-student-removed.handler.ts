import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CoursesStudentRemovedEvent } from '@/events/implements/courses-students/courses-student-removed.event';

@EventsHandler(CoursesStudentRemovedEvent)
export class CoursesStudentRemovedHandler
  implements IEventHandler<CoursesStudentRemovedEvent>
{
  async handle(event: CoursesStudentRemovedEvent) {
    const { coursesStudent } = event;
    Logger.log(
      `#${coursesStudent.id} - removed!`,
      CoursesStudentRemovedHandler.name
    );
    return event;
  }
}
