import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CoursesStudentCreatedEvent } from '@/events/implements/courses-students/courses-student-created.event';

@EventsHandler(CoursesStudentCreatedEvent)
export class CoursesStudentCreatedHandler
  implements IEventHandler<CoursesStudentCreatedEvent>
{
  async handle(event: CoursesStudentCreatedEvent) {
    const { coursesStudent } = event;
    Logger.log(
      `#${coursesStudent.id} - created!`,
      CoursesStudentCreatedHandler.name
    );
    return event;
  }
}
