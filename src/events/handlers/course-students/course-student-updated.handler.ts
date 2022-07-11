import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CourseStudentUpdatedEvent } from '@/events/implements/course-students/course-student-updated.event';

@EventsHandler(CourseStudentUpdatedEvent)
export class CourseStudentUpdatedHandler
  implements IEventHandler<CourseStudentUpdatedEvent>
{
  async handle(event: CourseStudentUpdatedEvent) {
    const { courseStudent } = event;
    Logger.log(
      `#${courseStudent.id} - updated!`,
      CourseStudentUpdatedHandler.name
    );
    return event;
  }
}
