import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CourseStudentCreatedEvent } from '@/events/implements/course-students/course-student-created.event';

@EventsHandler(CourseStudentCreatedEvent)
export class CourseStudentCreatedHandler
  implements IEventHandler<CourseStudentCreatedEvent>
{
  async handle(event: CourseStudentCreatedEvent) {
    const { courseStudent } = event;
    Logger.log(
      `#${courseStudent.id} - created!`,
      CourseStudentCreatedHandler.name
    );
    return event;
  }
}
