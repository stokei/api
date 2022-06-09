import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CoursesStudentUpdatedEvent } from '@/events/implements/courses-students/courses-student-updated.event';

@EventsHandler(CoursesStudentUpdatedEvent)
export class CoursesStudentUpdatedHandler
  implements IEventHandler<CoursesStudentUpdatedEvent>
{
  async handle(event: CoursesStudentUpdatedEvent) {
    const { coursesStudent } = event;
    Logger.log(
      `#${coursesStudent.id} - updated!`,
      CoursesStudentUpdatedHandler.name
    );
    return event;
  }
}
